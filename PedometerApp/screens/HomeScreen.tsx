import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StepContext } from '../context/StepContext';

const HomeScreen = () => {
  const { steps } = useContext(StepContext);

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>{steps} kroków</Text>
      <Text style={styles.distanceText}>{(steps * 0.0008).toFixed(2)} km</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  stepText: { fontSize: 48, fontWeight: 'bold' },
  distanceText: { fontSize: 24, color: 'gray' },
});

export default HomeScreen;
