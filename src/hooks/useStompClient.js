import { useContext } from "react";
import StompContext from "../context/StompContext";

/**
 * Returns the Stomp Client from @stomp/stompjs
 */
function useStompClient() {
  return useContext(StompContext).client;
}

export default useStompClient;
