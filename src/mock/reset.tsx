import { subscriptions } from './subscriptions';
import { messages } from './client';

export function reset() {
  subscriptions.clear();
  messages.clear();
}
