/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onListenerJoin
// ====================================================

export interface onListenerJoin_listenerJoined {
  __typename: "Listener";
  id: string;
  name: string;
}

export interface onListenerJoin {
  listenerJoined: onListenerJoin_listenerJoined;
}

export interface onListenerJoinVariables {
  roomName: string;
}
