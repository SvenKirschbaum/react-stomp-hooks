# react-stomp-hooks

> A react library to manage a application wide STOMP connection via SockJS or Websockets.

[![NPM](https://img.shields.io/npm/v/react-stomp-hooks.svg)](https://www.npmjs.com/package/react-stomp-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-stomp-hooks
```

## Usage

```jsx
import React from 'react'

import {
  StompSessionProvider,
  useSubscription,
} from "react-stomp-hooks";

const App = () => {
  return (
    //Initialize Stomp connection, will use SockJS for http(s) and WebSocket for ws(s)
    //The Connection can be used by all child components via the hooks or hocs.
    <StompSessionProvider
      url={"https://stream.elite12.de/api/sock"}
      //All options supported by @stomp/stompjs can be used here
      stompClientOptions={{}}
    >
      <SubscribingComponent />
    </StompSessionProvider>
  );
};

function SubscribingComponent() {
  const [lastMessage, setLastMessage] = useState("No message received yet");

  //Subscribe to /topic/test, and use handler for all received messages
  //Note that all subscriptions made through the library are automatically removed when their owning component gets unmounted.
  //If the STOMP connection itself is lost they are however restored on reconnect.
  useSubscription("/topic/test", (message) => setLastMessage(message.body));

  return (
    <Box>Last Message: {lastMessage}</Box>
  );
}
```

## License

MIT © [fallobst22](https://github.com/fallobst22)
