import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
// import { initialize, requestPermission, readRecords } from 'react-native-health-connect';

interface UseHealthDataReturn {
  steps: number;
  flights: number;
  distance: number;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const generateMockData = (date: Date) => {
  const seed = date.getDate();
  return {
    steps: 3000 + (seed * 123) % 5000, // pseudo-random
    distance: parseFloat(((seed * 73) % 7000 / 1000).toFixed(2)), // in km
    flights: (seed * 3) % 20,
  };
};

const isMockEnvironment = __DEV__ && Platform.OS === 'android';

const useHealthData = (date: Date): UseHealthDataReturn => {
  const [steps, setSteps] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  useEffect(() => {
    if (isMockEnvironment) {
      // MOCK PATH
      setIsLoading(true);
      const mock = generateMockData(date);
      setTimeout(() => {
        setSteps(mock.steps);
        setDistance(mock.distance);
        setFlights(mock.flights);
        setIsLoading(false);
      }, 500); // simulate async delay
      return;
    }

    // REAL PERMISSIONS PATH
    /*
    const requestHealthPermissions = async () => {
      if (Platform.OS !== 'android') {
        setError('Health Connect is only available on Android');
        setIsLoading(false);
        return;
      }

      try {
        const isInitialized = await initialize();
        if (!isInitialized) {
          setError('Failed to initialize Health Connect.');
          setIsLoading(false);
          return;
        }

        const permissions = await requestPermission([
          { accessType: 'read', recordType: 'Steps' },
          { accessType: 'read', recordType: 'Distance' },
          { accessType: 'read', recordType: 'FloorsClimbed' },
        ]);

        const granted = permissions.every(p => p.accessType === 'read');
        if (!granted) {
          setError('Health permissions not granted');
          setIsLoading(false);
        } else {
          setPermissionsGranted(true);
        }
      } catch (permError) {
        console.error('Permission request failed:', permError);
        setError('Failed to request permissions.');
        setIsLoading(false);
      }
    };

    requestHealthPermissions();
    */
  }, []);

  useEffect(() => {
    if (isMockEnvironment) return;

    // REAL DATA FETCHING PATH
    /*
    if (!permissionsGranted) return;

    const readSampleData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const timeRangeFilter = {
          operator: "between",
          startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
          endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
        };

        const [stepsData, distanceData, floorsData] = await Promise.all([
          readRecords('Steps', { timeRangeFilter }).catch(() => ({ records: [] })),
          readRecords('Distance', { timeRangeFilter }).catch(() => ({ records: [] })),
          readRecords('FloorsClimbed', { timeRangeFilter }).catch(() => ({ records: [] })),
        ]);

        setSteps(stepsData.records.reduce((sum, cur) => sum + cur.count, 0));
        setDistance(distanceData.records.reduce(
          (sum, cur) => sum + (cur.distance?.inMeters || 0), 0
        ));
        setFlights(floorsData.records.reduce((sum, cur) => sum + cur.floors, 0));
      } catch (readError) {
        console.error('Data reading failed:', readError);
        setError('Failed to read health data');
      } finally {
        setIsLoading(false);
      }
    };

    readSampleData();
    */
  }, [date, retryCount, permissionsGranted]);

  return {
    steps,
    flights,
    distance,
    isLoading,
    error,
    retry,
  };
};

export default useHealthData;
