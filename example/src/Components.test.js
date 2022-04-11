import { DynamicSubscription, HigherOrderComponents, SendingMessages, Subscribing } from './App';
import { mock as stompMock } from 'react-stomp-hooks';
import { render, screen, act, fireEvent } from '@testing-library/react';

//Clear all messages after each test
afterEach(() => {
  stompMock.reset();
});


//Test Subscribing Component using provided Mock implementation
it('Subscribing component works', () => {
  //Render Subscribing Component, with StompSessionProviderMock
  render(
    <stompMock.StompSessionProviderMock>
      <Subscribing />
    </stompMock.StompSessionProviderMock>
  )

  screen.getByText('Last Message: No message received yet');

  //Simulate receiving a Message
  act(() => {
    stompMock.sendMockMessage("/topic/test", {
      body: "Hello World"
    });
  });

  screen.getByText('Last Message: Hello World');
})

it('SendingMessages component works', () => {
  render(
    <stompMock.StompSessionProviderMock>
      <SendingMessages />
    </stompMock.StompSessionProviderMock>
  )

  //No message has been sent
  expect(stompMock.getSendMockMessages().size).toBe(0);

  //Send a message
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello World' } });
  fireEvent.click(screen.getByRole('button'));

  //Only one destination has been used
  expect(stompMock.getSendMockMessages().size).toBe(1);
  //Only one message has been sent to the selected destination
  expect(stompMock.getSendMockMessages("/app/echo")).toHaveLength(1);
  //The message has the correct body
  expect(stompMock.getSendMockMessages("/app/echo")[0].body).toBe("Echo Hello World");

  //Simulate receiving echo reply
  act(() => {
    stompMock.sendMockMessage("/user/queue/echoreply", {
      body: "Echo Hello World"
    });
  });

  //Check the reply being displayed
  screen.getByText('Last Message received: Echo Hello World');
})

it('HigherOrderComponents component works', () => {
  render(
    <stompMock.StompSessionProviderMock>
      <HigherOrderComponents />
    </stompMock.StompSessionProviderMock>
  )

  //No message has been sent
  expect(stompMock.getSendMockMessages().size).toBe(0);

  //Send a message
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello World' } });
  fireEvent.click(screen.getByRole('button'));

  //Only one destination has been used
  expect(stompMock.getSendMockMessages().size).toBe(1);
  //Only one message has been sent to the selected destination
  expect(stompMock.getSendMockMessages("/app/echo")).toHaveLength(1);
  //The message has the correct body
  expect(stompMock.getSendMockMessages("/app/echo")[0].body).toBe("Echo Hello World");

  //Simulate receiving echo reply
  act(() => {
    stompMock.sendMockMessage("/user/queue/echoreply", {
      body: "Echo Hello World"
    });
  });

  //Check the reply being displayed
  screen.getByText('Last Message received: Echo Hello World');
})

it('HigherOrderComponents component works', () => {
  render(
    <stompMock.StompSessionProviderMock>
      <DynamicSubscription />
    </stompMock.StompSessionProviderMock>
  )

  //No subscriotions by default
  expect(stompMock.getMockSubscriptions().size).toBe(0);

  //Click subscribe button
  fireEvent.click(screen.getByRole('button'));

  //Exactly one topic has subscriptions
  expect(stompMock.getMockSubscriptions().size).toBe(1);
  //Exactly one subscription has been made
  expect(stompMock.getMockSubscriptions("/topic/test").size).toBe(1);

  //Click unsubscribe button
  fireEvent.click(screen.getByRole('button'));

  //The subscription has been removed
  expect(stompMock.getMockSubscriptions("/topic/test").size).toBe(0);
});
