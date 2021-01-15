import React from "react";
import useStompClient from "../hooks/useStompClient";

function withStompClient(WrappedComponent) {
  return (props) => {
    const stompClient = useStompClient();
    return <WrappedComponent stompClient={stompClient} {...props} />;
  };
}

export default withStompClient;
