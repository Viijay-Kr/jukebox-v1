/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRequests
// ====================================================

export interface getRequests_requests_room {
  __typename: "ListenRoom";
  name: string;
}

export interface getRequests_requests {
  __typename: "ListenRequest";
  room: getRequests_requests_room;
  senderID: string;
  senderName: string;
}

export interface getRequests {
  requests: (getRequests_requests | null)[];
}

export interface getRequestsVariables {
  id: string;
}
