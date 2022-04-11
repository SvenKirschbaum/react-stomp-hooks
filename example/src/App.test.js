import React from 'react'
import { App } from './App';
import { render } from '@testing-library/react';

//If you want to test a component which contains a StompSessionProvider, you can use the following code to replace it with the provided Mock implementation:
jest.mock('react-stomp-hooks', () => {
  const originalModule = jest.requireActual('react-stomp-hooks');

  return {
    ...originalModule,
    StompSessionProvider: originalModule.mock.StompSessionProviderMock,
  };
})

it('app renders without crashing', () => {
  render(<App />);
})
