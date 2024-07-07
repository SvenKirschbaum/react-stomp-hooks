import { StompConfig } from "@stomp/stompjs";
import { ReactNode } from "react";

export interface StompSessionProviderProps extends StompConfig {
  /**
   * The URL to connect to the STOMP broker.
   * The URL can be a SockJS URL (http(s)://) or a raw Websocket URL (ws(s)://).
   */
  url: string;
  children: ReactNode;
  /**
   * If the STOMP connection should be enabled/disabled. Defaults to true.
   */
  enabled?: boolean;
  /**
   * The name of the StompSessionContext.
   * This can be used to mix multiple StompSessionProviders/Stomp Connections in the same application.
   * The default name is "default". When using a custom name, the same name must be specified as a parameter for all hooks and hocs.
   *
   */
  name?: string;
}
