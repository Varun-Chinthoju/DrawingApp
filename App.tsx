import React, { useRef, useState } from 'react';
import { StyleSheet, View, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Canvas, { CanvasHandle } from './src/components/Canvas';
import Toolbar from './src/components/Toolbar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const canvasRef = useRef<CanvasHandle>(null);
  const [color, setColor] = useState<string>('black');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [opacity, setOpacity] = useState<number>(1);

  const handleUndo = () => canvasRef.current?.undo();
  const handleRedo = () => canvasRef.current?.redo();
  const handleExport = () => canvasRef.current?.exportImage();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Canvas
          ref={canvasRef}
          color={color}
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
        <Toolbar
          color={color}
          setColor={setColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          opacity={opacity}
          setOpacity={setOpacity}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onExport={handleExport}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // dark premium background
  },
});

export default App;
