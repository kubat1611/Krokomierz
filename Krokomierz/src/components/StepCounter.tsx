import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useDispatch, useSelector } from 'react-redux';
import { setSteps } from '../store/stepsSlice';
import { RootState } from '../store/store';

const StepCounter = () => {
  const [isPedometerAvailable, setPedometerAvailable] = useState(false);
  const dispatch = useDispatch();
  const stepCount = useSelector((state: RootState) => state.steps.stepCount);

  useEffect(() => {
    const subscribe = async () => {
      const available = await Pedometer.isAvailableAsync();
      setPedometerAvailable(available);

      if (available) {
        Pedometer.watchStepCount((result) => {
          dispatch(setSteps(result.steps));
        });
      }
    };
    subscribe();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Krokomierz</Text>
      <Text style={styles.text}>Dostępność: {isPedometerAvailable ? 'Tak' : 'Nie'}</Text>
      <Text style={styles.text}>Liczba kroków: {stepCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default StepCounter;
