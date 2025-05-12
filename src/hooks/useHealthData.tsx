import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;

    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log('Error initializing HealthKit:', err);
        setError(err);
        return;
      }
      setHasPermission(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions || Platform.OS !== 'ios') return;

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, result) => {
      if (err) {
        console.log('Error getting step count:', err);
        setError(err);
        return;
      }
      setSteps(result.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, result) => {
      if (err) {
        console.log('Error getting flights climbed:', err);
        setError(err);
        return;
      }
      setFlights(result.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
      if (err) {
        console.log('Error getting distance:', err);
        setError(err);
        return;
      }
      setDistance(result.value);
    });
  }, [hasPermissions, date]);

  return {
    steps,
    flights,
    distance,
    error,
  };
};

export default useHealthData;
