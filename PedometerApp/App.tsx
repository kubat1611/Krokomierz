import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { StepProvider } from './context/StepContext';

export default function App() {
  return (
    <StepProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </StepProvider>
  );
}
