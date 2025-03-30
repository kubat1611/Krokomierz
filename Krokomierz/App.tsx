import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

type ValueProps = {
  label: string;
  value: string;
};

const Value = ({label, value}: ValueProps) => (
<View>
  <Text style={styles.label} >{label}</Text>
  <Text style={styles.value}>{value}</Text>
</View>
);


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
  },
  label : {
    color: 'white',
    fontSize: 20,
  },
  value : {
    fontSize: 43,
    color: '#ed2647',
    fontWeight: '500',
  },



  
});
