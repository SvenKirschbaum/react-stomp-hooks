import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
  withStompClient,
  withSubscription
} from "react-stomp-hooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const App = () => {
  return (
    //Initialize Stomp connection, will use sockjs, as the protocol specified is https
    //The Connection can be used by all child components via the hooks or hocs.
    <StompSessionProvider
      url={"https://stream.elite12.de/api/sock"}
      //All options supported by @stomp/stompjs can be used here
      debug={(str) => {
        console.log(str);
      }}
    >
      <CssBaseline />
      <Container>
        <Card style={{ margin: "3em" }} variant="outlined">
          <CardContent>
            <Typography>You can see the STOMP Messages send and received in the browser console</Typography>
            <Typography>Note that, because the components are unmounted when the accordion is unexpanded, all subscriptions are removed when you close the accordion.</Typography>
          </CardContent>
        </Card>
        <Showcase title={"Subscribing"}><Subscribing /></Showcase>
        <Showcase title={"Sending Messages"}><SendingMessages /></Showcase>
        <Showcase title={"Higher Order Components"}><HigherOrderComponents /></Showcase>
        <Showcase title={"Dynamic subscribing/unsubscribing"}><DynamicSubscription /></Showcase>
      </Container>
    </StompSessionProvider>
  );
};

function Subscribing() {
  const [lastMessage, setLastMessage] = useState("No message received yet");

  //Subscribe to /topic/test, and use handler for all received messages
  //Note that all subscriptions made through the library are automatically removed when their owning component gets unmounted.
  //If the STOMP connection itself is lost they are however restored on reconnect.
  //You can also supply an array as the first parameter, which will subscribe to all destinations in the array
  useSubscription("/topic/test", (message) => setLastMessage(message.body));

  return (
    <Box>Last Message: {lastMessage}</Box>
  );
}

function SendingMessages() {
  const [input, setInput] = useState("");
  const [lastMessage, setLastMessage] = useState("No message received yet");

  //Get Instance of StompClient
  //This is the StompCLient from @stomp/stompjs
  const stompClient = useStompClient();
  useSubscription("/user/queue/echoreply", (message) => setLastMessage(message.body));

  const sendMessage = () => {
    //Send Message
    stompClient.publish({
      destination: "/app/echo",
      body: "Echo " + input
    });
  };

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item><Button variant={"contained"} onClick={sendMessage}>Send Message</Button></Grid>
      <Grid item><TextField variant="standard" value={input}
                            onChange={(event => setInput(event.target.value))} /></Grid>
      <Grid item>
        <Typography variant={"body1"}>
          Last Message received: {lastMessage}
        </Typography>
      </Grid>
    </Grid>
  );
}

const HigherOrderComponents = withStompClient(withSubscription(
  class HOCDemo extends React.Component {

    constructor(props) {
      super(props);

      //stompCLient property is injected in the withStompClient HOC
      this.stompClient = props.stompClient;
      this.state = {
        input: "",
        lastMessage: "No message received yet"
      };

      this.handleChange = this.handleChange.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.onMessage = this.onMessage.bind(this);
    }

    //You have to specify an onMessage method for the withSubscription HOC.
    onMessage(message) {
      this.setState({
        lastMessage: message.body
      });
    }

    sendMessage() {
      this.stompClient.publish({
        destination: "/app/echo",
        body: "Echo " + this.state.input
      });
    }

    handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }

    render() {
      return (
        <Grid container direction="row" spacing={3}>
          <Grid item><Button variant={"contained"} onClick={this.sendMessage}>Send Message</Button></Grid>
          <Grid item><TextField variant="standard" value={this.state.input} onChange={this.handleChange} /></Grid>
          <Grid item>
            <Typography variant={"body1"}>
              Last Message received: {this.state.lastMessage}
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }, "/user/queue/echoreply")
);

function DynamicSubscription() {
  const [lastMessage, setLastMessage] = useState("No message received yet");
  const [subscribed, setSubscribed] = useState(false);

  useSubscription(
    //The value of the first parameter can be mutated to dynamically subscribe/unsubscribe from topics
    subscribed ? ["/topic/test"] : [],
    (message) => setLastMessage(message.body)
  );

  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <Box>Last Message: {lastMessage}</Box>
      <Box>
        <Button onClick={() => setSubscribed(!subscribed)}>{subscribed ? "Unsubscribe" : "Subscribe"}</Button>
      </Box>
    </Box>
  );
}

function Showcase(props) {
  return (
    <Accordion style={{ margin: "3em" }} TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
}

export default App;
