import { IPublishParams } from '@stomp/stompjs';

export const messages = new Map<string, Array<IPublishParams>>();

export function publishMockMessage(params: IPublishParams) {
  if (!messages.has(params.destination)) {
    messages.set(params.destination, []);
  }

  // @ts-ignore
  messages.get(params.destination).push(params);
}

export function getMockClient() {
  return {
    publish: publishMockMessage
  };
}

export function getSendMockMessages(destination?: string) {
  if (destination) {
    return messages.get(destination);
  }
  return messages;
}
