import React, { useEffect, useRef, useState } from "react";
import StompContext from "../context/StompContext";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

/**
 * The StompSessionProvider manages the STOMP connection
 * All Hooks and HOCs in this library require an anchestor of this type.
 * The URL to connect to can be specified via the url prop.
 * Depending on the Schema of the URL either Sockjs or a raw Weboscket is used.
 * You can override this behavior with the brokerURL or webSocketFactory option of the stompClientOptions.
 * Custom @stomp/stompjs options can be used via the stompClientOptions prop.
 * Please consult the @stomp/stompjs documentation for more information.
 */
function StompSessionProvider(props) {
  const { url, stompClientOptions } = props;

  const [client, setClient] = useState(undefined);
  const subscriptionRequests = useRef(new Map());


  useEffect(() => {
    const _client = new Client(stompClientOptions);

    if (!stompClientOptions.brokerURL && !stompClientOptions.webSocketFactory) {
      _client.webSocketFactory = function() {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
          return new SockJS(url);
        } else if (parsedUrl.protocol === "ws:" || parsedUrl.protocol === "wss:") {
          return new WebSocket(url);
        } else throw "Protocol not supported";
      };
    }

    _client.onConnect = function(frame) {
      if (stompClientOptions.onConnect) stompClientOptions.onConnect(frame);

      subscriptionRequests.current.forEach(value => {
        value.subscription = _client.subscribe(value.destination, value.callback, value.headers);
      });
    };

    if (!stompClientOptions.onStompError) {
      _client.onStompError = function(frame) {
        throw frame;
      };
    }

    _client.activate();
    setClient(_client);

    return () => _client.deactivate();
  }, [url, stompClientOptions]);

  const subscribe = (destination, callback, headers = {}) => {
    const subscriptionId = Math.random().toString(36).substr(2, 9);
    const subscriptionRequest = {
      destination,
      callback,
      headers
    };

    subscriptionRequests.current.set(subscriptionId, subscriptionRequest);

    if (client) {
      subscriptionRequest.subscription = client.subscribe(destination, callback, headers);
    }

    return () => {
      subscriptionRequests.current.get(subscriptionId).subscription.unsubscribe();
      subscriptionRequests.current.delete(subscriptionId);
    };
  };

  return (
    <StompContext.Provider value={{
      client,
      subscribe
    }}>
      {props.children}
    </StompContext.Provider>
  );
}

export default StompSessionProvider;
