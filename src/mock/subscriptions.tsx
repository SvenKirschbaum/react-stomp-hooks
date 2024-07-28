import { IMessage } from "@stomp/stompjs";
import { messageCallbackType, StompHeaders } from "@stomp/stompjs";

export const subscriptions = new Map<
  string,
  Map<string, messageCallbackType>
>();

export function subscribeMock(
  destination: string,
  callback: messageCallbackType,
  // @ts-expect-error - irrelevant in mock
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  headers: StompHeaders = {},
) {
  const subscriptionId = Math.random().toString(36).substr(2, 9);

  if (!subscriptions.has(destination)) {
    subscriptions.set(destination, new Map<string, messageCallbackType>());
  }

  // @ts-expect-error undefined check
  subscriptions.get(destination).set(subscriptionId, callback);

  return () => {
    // Might be undefined if reset was called before the component unmounted
    subscriptions.get(destination)?.delete(subscriptionId);
  };
}

/**
 * Simulates receiving a message from the server to the specified destination
 * @param destination The topic to send the message to
 * @param message The message to send
 */
export function mockReceiveMessage(
  destination: string,
  message: IMessage,
): void {
  if (subscriptions.has(destination)) {
    // @ts-expect-error undefined check
    subscriptions.get(destination).forEach((callback: messageCallbackType) => {
      callback(message);
    });
  }
}

/**
 * Gets the current subscriptions for the specified destination
 * @param destination The topic to get the subscriptions for, or undefined to get all subscriptions
 */
export function getMockSubscriptions(destination?: string) {
  if (destination) {
    return subscriptions.get(destination);
  }
  return subscriptions;
}
