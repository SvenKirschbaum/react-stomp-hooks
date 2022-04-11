import { IMessage } from '@stomp/stompjs/src/i-message';
import { messageCallbackType, StompHeaders } from '@stomp/stompjs';

export const subscriptions = new Map<string, Map<string, Function>>();

export function subscribeMock(
  destination: string,
  callback: messageCallbackType,
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  headers: StompHeaders = {}
) {
  const subscriptionId = Math.random().toString(36).substr(2, 9);

  if (!subscriptions.has(destination)) {
    subscriptions.set(destination, new Map<string, Function>());
  }

  // @ts-ignore
  subscriptions.get(destination).set(subscriptionId, callback);

  return () => {
    // @ts-ignore
    subscriptions.get(destination).delete(subscriptionId);
  };
}

export function sendMockMessage(destination: string, message: IMessage): void {
  if (subscriptions.has(destination)) {
    // @ts-ignore
    subscriptions.get(destination).forEach((callback: Function) => {
      callback(message);
    });
  }
}

export function getMockSubscriptions(destination?: string) {
  if (destination) {
    return subscriptions.get(destination);
  }
  return subscriptions;
}
