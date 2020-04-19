/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: room
// ====================================================

export interface room_createRoom {
  __typename: "ListenRoom";
  name: string;
  playlistID: string;
}

export interface room {
  createRoom: room_createRoom;
}

export interface roomVariables {
  roomName: string;
  owner: string;
  playlistID: string;
}
