import { StompConfig } from '@stomp/stompjs';
import { ReactNode } from 'react';

export interface StompSessionProviderProps extends StompConfig {
  url: string;
  children: ReactNode;
  /**
   * @deprecated
   */
  stompClientOptions?: object;
}
