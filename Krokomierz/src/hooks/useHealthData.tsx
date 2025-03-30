import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';

interface UseHealthDataReturn {
  steps: number;
  flights: number;
  distance: number;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

interface TimeRangeFilter {
  operator: "between";
  startTime: string;
  endTime: string;
}

const useHealthData = (date: Date): UseHealthDataReturn => {
  const [steps, setSteps] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  const readSampleData = async (): Promise<void> => {
    try {
      if (Platform.OS !== 'android') {
        setError('Health Connect is only available on Android');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      console.log('Initializing Health Connect...');

      const isInitialized = await initialize();

      console.log('Health Connect initialized successfully');
      
      if (!isInitialized) {
        setError('Failed to initialize Health Connect. Please try again.');
        setIsLoading(false);
        return;
      }

      console.log('Health Connect initialized successfully');

      console.log('Requesting permissions...');
      
      // let granted = false;
      // try {
      //   const permissions = await requestPermission([
      //     { accessType: 'read', recordType: 'Steps' },
      //     { accessType: 'read', recordType: 'Distance' },
      //     { accessType: 'read', recordType: 'FloorsClimbed' },
      //   ]);
      //   granted = permissions.every(permission => permission.accessType === 'read' && permission.recordType);
      //   console.log('Permissions granted:', permissions);
      // } catch (permError) {
      //   console.error('Permission request failed:', permError);
      //   setError('Failed to request permissions. Please restart the app.');
      //   setIsLoading(false);
      //   return;
      // }

      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        // { accessType: 'read', recordType: 'Distance' },
        // { accessType: 'read', recordType: 'FloorsClimbed' }
      ]);

      grantedPermissions.forEach((permission) => {
        console.log(`Permission for ${permission.recordType}: ${permission.accessType}`);
      });

      // if (!granted) {
      //   setError('Permission not granted');
      //   setIsLoading(false);
      //   return;
      // }

      const timeRangeFilter: TimeRangeFilter = {
        operator: "between",
        startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
        endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
      };

      try {
        // const [stepsData, distanceData, floorsData] = await Promise.all([
        const [stepsData] = await Promise.all([
          readRecords('Steps', { timeRangeFilter }).catch(e => ({ records: [] })),
          // readRecords('Distance', { timeRangeFilter }).catch(e => ({ records: [] })),
          // readRecords('FloorsClimbed', { timeRangeFilter }).catch(e => ({ records: [] })),
        ]);

        setSteps(stepsData.records.reduce((sum, cur) => sum + cur.count, 0));
        // setDistance(distanceData.records.reduce(
        //   (sum, cur) => sum + (cur.distance?.inMeters || 0), 0
        // ));
        // setFlights(floorsData.records.reduce((sum, cur) => sum + cur.floors, 0));
      } catch (readError) {
        console.error('Data reading failed:', readError);
        setError('Failed to read health data');
      }
    } catch (err) {
      console.error('Health Connect error:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    readSampleData();
  }, [date, retryCount]);

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