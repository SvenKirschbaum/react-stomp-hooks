import React, { useRef } from "react";
import useSubscription from "../hooks/useSubscription";

function withSubscription(WrappedComponent, destination, headers = {}) {
  return (props) => {
    const ref = useRef();
    useSubscription(destination, (message) => ref.current.onMessage(message), headers);
    return <WrappedComponent ref={ref} {...props} />;
  };
}

export default withSubscription;
