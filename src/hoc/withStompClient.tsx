import React from "react";
import useStompClient from "../hooks/useStompClient";

function withStompClient<P>(WrappedComponent: React.ComponentType<P>) {
  const comp = (props: P) => {
    const stompClient = useStompClient();
    return <WrappedComponent stompClient={stompClient} {...props} />;
  };

  comp.displayName = `withStompClient(${WrappedComponent.displayName || WrappedComponent.name})`;

  return comp;
}

export default withStompClient;
