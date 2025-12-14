import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

export type CanvasHandle = {
  undo: () => void;
  redo: () => void;
  exportImage: () => Promise<void>;
};

type CanvasProps = {
  color?: string;
  strokeWidth?: number;
  opacity?: number;
};

const Canvas = forwardRef<CanvasHandle, CanvasProps>((props, ref) => {
  const { color = 'black', strokeWidth = 4, opacity = 1 } = props;
  const [paths, setPaths] = useState<string[]>([]);
  const [_undone, setUndone] = useState<string[]>([]); // renamed to silence unused lint
  const currentPath = useRef<string>('');
  const viewRef = useRef<View>(null);

  const onGestureEvent = (event: { nativeEvent: { x: number; y: number } }) => {
    const { x, y } = event.nativeEvent;
    if (currentPath.current === '') {
      currentPath.current = `M ${x} ${y}`;
    } else {
      currentPath.current += ` L ${x} ${y}`;
    }
  };

  const onHandlerStateChange = (event: { nativeEvent: { state: number } }) => {
    if (event.nativeEvent.state === State.END) {
      if (currentPath.current !== '') {
        setPaths(prev => [...prev, currentPath.current]);
        setUndone([]); // clear redo stack on new stroke
        currentPath.current = '';
      }
    }
  };

  // expose methods via ref
  useImperativeHandle(ref, () => ({
    undo: () => {
      setPaths(prev => {
        if (prev.length === 0) return prev;
        const newPaths = [...prev];
        const last = newPaths.pop() as string;
        setUndone(u => [last, ...u]);
        return newPaths;
      });
    },
    redo: () => {
      setUndone(prev => {
        if (prev.length === 0) return prev;
        const newUndone = [...prev];
        const next = newUndone.shift() as string;
        setPaths(p => [...p, next]);
        return newUndone;
      });
    },
    exportImage: async () => {
      if (viewRef.current) {
        try {
          const uri = await captureRef(viewRef.current, { format: 'png', quality: 0.9 });
          const dest = `${RNFS.DocumentDirectoryPath}/drawing_${Date.now()}.png`;
          await RNFS.moveFile(uri, dest);
          console.log('Saved drawing to', dest);
        } catch (e) {
          console.error('Export failed', e);
        }
      }
    },
  }));

  return (
    <View style={styles.container} ref={viewRef}>
      <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <View style={styles.drawingArea}>
          <Svg height={height} width={width} style={styles.svg}>
            {paths.map((d, i) => (
              <Path
                key={i}
                d={d}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeOpacity={opacity}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {currentPath.current !== '' && (
              <Path
                d={currentPath.current}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeOpacity={opacity}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </PanGestureHandler>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawingArea: { flex: 1 },
  svg: { backgroundColor: '#fff' },
});

export default Canvas;

