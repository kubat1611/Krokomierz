import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Value label="Steps" value={'2135'}/>
        <Value label="Distance" value={'0.75 km'}/>
        <Value label="Flights climbed" value={'12'}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  values: {
      flexDirection: 'row', 
      gap: 25, 
      flexWrap: 'wrap',
  },
  container: { 
    flex: 1,
    backgroundColor: '#252525',
    justifyContent: 'center',
    padding: 12,
  }  
});
