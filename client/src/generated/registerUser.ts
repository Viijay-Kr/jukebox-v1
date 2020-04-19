/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Accounts } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registerUser
// ====================================================

export interface registerUser_createUser_linkedAccounts {
  __typename: "ExternalAccounts";
  account: Accounts;
  accessToken: string;
}

export interface registerUser_createUser {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  linkedAccounts: registerUser_createUser_linkedAccounts[] | null;
  isOnline: boolean;
}

export interface registerUser {
  createUser: registerUser_createUser;
}

export interface registerUserVariables {
  email: string;
  name: string;
}
