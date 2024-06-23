import { messageCallbackType } from "@stomp/stompjs";
import React from "react";

export interface MessageReceiverInterface {
  onMessage: messageCallbackType;
}

export type StompMessageReceiver<P = object> = React.ComponentClass<P> & {
  new (
    props: P,
    context?: unknown,
  ): React.Component<P> & MessageReceiverInterface;
};
