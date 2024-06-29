import React from "react";
import { subscribeMock } from "./subscriptions";
import { getMockClient } from "./client";
import getStompContext from "../context/StompContext";

/**
 * A mock StompSessionProvider.
 * Messages send via this mock implementation can be received via the getSentMockMessages method.
 * Subscriptions can be received via the getMockSubscriptions method.
 * The sendMockMessage method can be used, to simulate receiving a message from the server.
 *
 * @param props.client Optional. Can be used to provide a custom mock of the stompjs client,
 * in case you require additional properties/functions to be present. getMockClient can be used as a base.
 * @param props.name Optional. The name of the StompSessionProvider. Default is "default"
 * @constructor
 */
export default function StompSessionProviderMock(props: {
  children: React.ReactNode;
  client?: unknown;
  name?: string;
}) {
  const StompContext = getStompContext(props.name || "default");

  return (
    <StompContext.Provider
      value={{
        subscribe: subscribeMock,
        // @ts-expect-error - Mock client is not a full client
        client: props.client ?? getMockClient(),
      }}
    >
      {props.children}
    </StompContext.Provider>
  );
}
