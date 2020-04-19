import { gql } from "apollo-boost";

export const listenRoom = gql`
  subscription onListenerJoin($roomName: String!) {
    listenerJoined(roomName: $roomName) {
      id
      name
    }
  }
`;

export const requestsQuery = gql`
  query getRequests($id: ID!) {
    requests(id: $id) {
      room {
        name
      }
      senderID
      senderName
    }
  }
`;

export const requestToJoin = gql`
  mutation sendRequest(
    $playlistID: String!
    $roomName: String!
    $senderID: ID!
    $receiverID: ID!
    $username: String!
  ) {
    requestToListen(
      playlistID: $playlistID
      roomName: $roomName
      senderID: $senderID
      receiverID: $receiverID
      username: $username
    ) {
      name
    }
  }
`;

export const joinRoomQuery = gql`
  mutation joinRoom($roomName: String!, $userID: ID!, $username: String!) {
    joinRoom(roomName: $roomName, userID: $userID, username: $username) {
      name
      listeners {
        id
        name
      }
    }
  }
`;
