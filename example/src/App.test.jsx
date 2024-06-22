import React from 'react'
import { App } from './App.jsx';
import { render } from '@testing-library/react';

//If you want to test a component which contains a StompSessionProvider, you can use the following code to replace it with the provided Mock implementation:
vi.mock('react-stomp-hooks', async () => {
  const originalModule = await vi.importActual('react-stomp-hooks');

  return {
    ...originalModule,
    StompSessionProvider: originalModule.mock.StompSessionProviderMock,
  };
})

it('app renders without crashing', () => {
  render(<App />);
})
