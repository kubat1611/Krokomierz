import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';

type ValueProps = {
  label: ReactNode;
  value: string;
};

const Value = ({label, value}: ValueProps) => (
<View>
  <Text style={styles.label} >{label}</Text>
  <Text style={styles.value}>{value}</Text>
</View>
);


const styles = StyleSheet.create({
   label : {
      color: 'white',
      fontSize: 20,
    },
    value : {
      fontSize: 43,
      color: '#ed2647',
      fontWeight: '500',
    }  
  });
  

  export default Value;