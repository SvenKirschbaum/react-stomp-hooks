import { useContext } from "react";
import { StompSessionProviderContext } from "../interfaces/StompSessionProviderContext";
import getStompContext from "../context/StompContext";

/**
 * Returns the Stomp Client from @stomp/stompjs
 * This will be undefined if the client is currently not connected
 */
function useStompClient(name?: string) {
  const context = useContext<StompSessionProviderContext | undefined>(
    getStompContext(name || "default"),
  );

  if (context === undefined)
    throw new Error(
      "There must be a StompSessionProvider as Ancestor of all Stomp Hooks and HOCs",
    );

  return context.client;
}

export default useStompClient;
