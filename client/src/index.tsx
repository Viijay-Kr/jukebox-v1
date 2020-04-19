import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { RetryLink } from "apollo-link-retry";
import { from, split } from "apollo-link";
const GRAPHQL_ENDPOINT = "ws://localhost:4005/query";

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});
const wsLink = new WebSocketLink(client);
const httpLink = new HttpLink({ uri: "http://localhost:8888/query" });
const listenRoomOps = ["room", "sendRequest", "getRequests", "joinRoom"];
// depending on what kind of operation is being sent
const link = from([
  new RetryLink().split(({ operationName }) => {
    return listenRoomOps.includes(operationName);
  }, new HttpLink({ uri: "http://localhost:4005/query" })),
  split(
    // split based on operation type
    ({ query }) => {
      //@ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  ),
]);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
