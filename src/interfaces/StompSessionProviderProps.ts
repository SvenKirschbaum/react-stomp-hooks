import { StompConfig } from '@stomp/stompjs/esm6/stomp-config';

export interface StompSessionProviderProps extends StompConfig {
  url: string;
  children: any;
  /**
   * @deprecated
   */
  stompClientOptions?: any;
}
