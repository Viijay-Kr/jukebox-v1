/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendRequest
// ====================================================

export interface sendRequest_requestToListen {
  __typename: "ListenRoom";
  name: string;
}

export interface sendRequest {
  requestToListen: sendRequest_requestToListen | null;
}

export interface sendRequestVariables {
  playlistID: string;
  roomName: string;
  senderID: string;
  receiverID: string;
  username: string;
}
