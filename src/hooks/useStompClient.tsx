import { useContext } from 'react';
import StompContext from '../context/StompContext';
import { StompSessionProviderContext } from '../interfaces/StompSessionProviderContext';

/**
 * Returns the Stomp Client from @stomp/stompjs
 */
function useStompClient() {
  const context = useContext<StompSessionProviderContext | undefined>(
    StompContext
  );

  if (context === undefined)
    throw new Error(
      'There must be a StompSessionProver as Ancestor of all Stomp Hooks and HOCs'
    );

  return context.client;
}

export default useStompClient;
