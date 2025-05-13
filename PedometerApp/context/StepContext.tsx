import React, { createContext, useState, useEffect } from 'react';
import * as Pedometer from 'expo-sensors/build/Pedometer';

export const StepContext = createContext({ steps: 0 });

export const StepProvider = ({ children }: any) => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const subscribe = Pedometer.watchStepCount(result => {
      setSteps(result.steps);
    });

    return () => subscribe.remove();
  }, []);

  return (
    <StepContext.Provider value={{ steps }}>
      {children}
    </StepContext.Provider>
  );
};
