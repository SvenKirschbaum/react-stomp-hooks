import { useContext, useEffect } from "react";
import StompContext from "../context/StompContext";

/**
 *
 * @param destination The destination to subscribe to
 * @param onMessage Callback called when a message arrives for this subscription
 * @param headers Additional Headers for this subscription, consult @stomp/stompjs docs.
 */
function useSubscription(destination, onMessage, headers = {}) {
  const stompContext = useContext(StompContext);

  useEffect(() => {
    return stompContext.subscribe(destination, onMessage, headers);
  }, [destination]);
}

export default useSubscription;
