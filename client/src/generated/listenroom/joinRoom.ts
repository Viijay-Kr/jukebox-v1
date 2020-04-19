/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: joinRoom
// ====================================================

export interface joinRoom_joinRoom_listeners {
  __typename: "Listener";
  id: string;
  name: string;
}

export interface joinRoom_joinRoom {
  __typename: "ListenRoom";
  name: string;
  listeners: joinRoom_joinRoom_listeners[];
}

export interface joinRoom {
  joinRoom: joinRoom_joinRoom;
}

export interface joinRoomVariables {
  roomName: string;
  userID: string;
  username: string;
}
