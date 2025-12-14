import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type ToolbarProps = {
  color: string;
  setColor: (c: string) => void;
  strokeWidth: number;
  setStrokeWidth: (w: number) => void;
  opacity: number;
  setOpacity: (o: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
};

const presetColors = ['black', 'red', 'blue', 'green', 'orange', 'purple'];

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  setColor,
  strokeWidth,
  setStrokeWidth,
  opacity,
  setOpacity,
  onUndo,
  onRedo,
  onExport,
}) => {
  return (
    <View style={styles.container}>
      {/* Color picker */}
      <View style={styles.row}>
        {presetColors.map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.colorSwatch, { backgroundColor: c }, color === c && styles.selectedSwatch]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      {/* Stroke width slider */}
      <View style={styles.sliderRow}>
        <Text style={styles.label}>Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          step={1}
          value={strokeWidth}
          onValueChange={setStrokeWidth}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1a9274"
        />
        <Text style={styles.value}>{strokeWidth}</Text>
      </View>

      {/* Opacity slider */}
      <View style={styles.sliderRow}>
        <Text style={styles.label}>Opacity</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={1}
          step={0.1}
          value={opacity}
          onValueChange={setOpacity}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1a9274"
        />
        <Text style={styles.value}>{opacity.toFixed(1)}</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onUndo}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRedo}>
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onExport}>
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#222', // dark premium background
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#444',
  },
  selectedSwatch: {
    borderColor: '#fff',
    borderWidth: 3,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    color: '#fff',
    width: 60,
  },
  slider: {
    flex: 1,
  },
  value: {
    width: 30,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#1fb28a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Toolbar;
