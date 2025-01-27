import { useRef } from "react";
import useSubscription from "../hooks/useSubscription";
import { StompHeaders, IMessage } from "@stomp/stompjs";
import {
  MessageReceiverInterface,
  StompMessageReceiver,
} from "../interfaces/StompMessageReceiver";

function withSubscription<P>(
  WrappedComponent: StompMessageReceiver<P>,
  destinations: string | string[],
  headers: StompHeaders = {},
  name?: string,
) {
  const comp = (props: P) => {
    const ref = useRef<MessageReceiverInterface>(null);
    useSubscription(
      destinations,
      (message: IMessage) => {
        if (ref.current) ref.current.onMessage(message);
      },
      headers,
      name,
    );

    // @ts-expect-error - Ref type incompatible
    return <WrappedComponent ref={ref} {...props} />;
  };

  comp.displayName = `withSubscription(${WrappedComponent.displayName || WrappedComponent.name})`;

  return comp;
}

export default withSubscription;
