import React from 'react';
import StompContext from '../context/StompContext';
import { subscribeMock } from './subscriptions';
import { getMockClient } from './client';

export default function StompSessionProviderMock(props: {
  children: React.ReactNode;
  // By default we mock only the publish function on the client.
  // If you want to mock more functions, you can pass your own implementation
  client?: any;
}) {
  return (
    <StompContext.Provider
      value={{
        subscribe: subscribeMock,
        // @ts-ignore
        client: props.client ?? getMockClient()
      }}
    >
      {props.children}
    </StompContext.Provider>
  );
}
