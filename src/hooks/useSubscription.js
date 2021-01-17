import { useContext, useEffect } from 'react'
import StompContext from '../context/StompContext'

/**
 *
 * @param destinations The destinations to subscribe to. Can be a string for a single destination or an array of strings for multiple.
 * @param onMessage Callback called when a message arrives for this subscription
 * @param headers Additional Headers for this subscription, consult @stomp/stompjs docs.
 */
function useSubscription(destinations, onMessage, headers = {}) {
  const stompContext = useContext(StompContext)

  useEffect(() => {
    const _destinations = Array.isArray(destinations)
      ? destinations
      : [destinations]

    const cleanUpFunctions = []

    _destinations.forEach((_destination) =>
      cleanUpFunctions.push(
        stompContext.subscribe(_destination, onMessage, headers)
      )
    )

    return () => {
      cleanUpFunctions.forEach((_cleanUpFunction) => {
        _cleanUpFunction()
      })
    }
  }, [destinations])
}

export default useSubscription
