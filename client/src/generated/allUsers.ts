/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allUsers
// ====================================================

export interface allUsers_users {
  __typename: "User";
  isOnline: boolean;
  id: string;
  name: string;
}

export interface allUsers {
  users: allUsers_users[];
}
