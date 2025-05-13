import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HistoryScreen = () => {
  const mockData = [2000, 3200, 4500, 1200, 6000, 7000, 3000];

  return (
    <View>
      <LineChart
        data={{
          labels: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'],
          datasets: [{ data: mockData }],
        }}
        width={350}
        height={220}
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => `#1E90FF`,
        }}
      />
    </View>
  );
};

export default HistoryScreen;
