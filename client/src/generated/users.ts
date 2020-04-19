/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Accounts } from "./globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_userById_linkedAccounts {
  __typename: "ExternalAccounts";
  account: Accounts;
  accessToken: string;
}

export interface users_userById {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  linkedAccounts: users_userById_linkedAccounts[] | null;
}

export interface users {
  userById: users_userById;
}

export interface usersVariables {
  id: string;
}
