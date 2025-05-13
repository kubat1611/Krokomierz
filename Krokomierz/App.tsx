import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';
import ProgressRing from './src/components/ProgressRing';
import { useState } from 'react';
import useHealthData from './src/hooks/useHealthData';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const STEPS_GOAL = 10_000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numDays);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
      </View>

      <ProgressRing
        radius={150}
        strokeWidth={50}
        progress={steps / STEPS_GOAL}
      />

      <View style={styles.values}>
        <Value
          label={<><MaterialCommunityIcons name="walk" size={18} color="white" /> Steps</>}
          value={steps.toString()}
        />
        <Value
          label={<><MaterialCommunityIcons name="map-marker-distance" size={18} color="white" /> Distance</>}
          value={`${(distance / 1000).toFixed(2)} km`}
        />
        <Value
          label={<><MaterialCommunityIcons name="stairs-up" size={18} color="white" /> Flights</>}
          value={flights.toString()}
        />
      </View>

      <Text style={styles.quote}>
        "Każdy krok się liczy. Rób swoje!"
      </Text>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29', // zamiast gradientu
    justifyContent: 'center',
    padding: 12,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 80,
    justifyContent: 'center',
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 20,
  },
  quote: {
    color: '#FF4081',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
});
