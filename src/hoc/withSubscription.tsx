import React, { useRef } from 'react';
import useSubscription from '../hooks/useSubscription';
import { StompHeaders } from '@stomp/stompjs';
import {
  MessageReceiverInterface,
  StompMessageReceiver
} from '../interfaces/StompMessageReceiver';
import { IMessage } from '@stomp/stompjs/esm6/i-message';

function withSubscription<P>(
  WrappedComponent: StompMessageReceiver<P>,
  destinations: string | string[],
  headers: StompHeaders = {}
) {
  return (props: P) => {
    const ref = useRef<MessageReceiverInterface>();
    useSubscription(
      destinations,
      (message: IMessage) => {
        if (ref.current) ref.current.onMessage(message);
      },
      headers
    );

    // @ts-ignore
    return <WrappedComponent ref={ref} {...props} />;
  };
}

export default withSubscription;
