import React, { useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Canvas = () => {
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef<string>('');

  const onGestureEvent = (event: any) => {
    const { x, y } = event.nativeEvent;
    if (currentPath.current === '') {
      currentPath.current = `M ${x} ${y}`;
    } else {
      currentPath.current += ` L ${x} ${y}`;
    }
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // finalize current path
      if (currentPath.current !== '') {
        setPaths(prev => [...prev, currentPath.current]);
        currentPath.current = '';
      }
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={styles.drawingArea}>
          <Svg height={height} width={width} style={styles.svg}>
            {paths.map((d, i) => (
              <Path
                key={i}
                d={d}
                stroke="black"
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {/* Render the in‑progress path */}
            {currentPath.current !== '' && (
              <Path
                d={currentPath.current}
                stroke="black"
                strokeWidth={4}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawingArea: {
    flex: 1,
  },
  svg: {
    backgroundColor: '#fff',
  },
});

export default Canvas;
