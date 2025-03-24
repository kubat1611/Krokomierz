import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import StepCounter from './src/components/StepCounter';

export default function App() {
  return (
    <Provider store={store}>
      <StepCounter />
    </Provider>
  );
}
