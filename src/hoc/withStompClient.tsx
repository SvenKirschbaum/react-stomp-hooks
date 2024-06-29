import React from "react";
import useStompClient from "../hooks/useStompClient";

function withStompClient<P>(
  WrappedComponent: React.ComponentType<P>,
  name?: string,
) {
  const comp = (props: P) => {
    const stompClient = useStompClient(name);
    return <WrappedComponent stompClient={stompClient} {...props} />;
  };

  comp.displayName = `withStompClient(${WrappedComponent.displayName || WrappedComponent.name})`;

  return comp;
}

export default withStompClient;
