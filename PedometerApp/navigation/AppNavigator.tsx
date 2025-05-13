import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kroki" component={HomeScreen} />
      <Stack.Screen name="Historia" component={HistoryScreen} />
    </Stack.Navigator>
  );
}
