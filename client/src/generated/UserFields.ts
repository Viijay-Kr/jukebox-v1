/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Accounts } from "./globalTypes";

// ====================================================
// GraphQL fragment: UserFields
// ====================================================

export interface UserFields_linkedAccounts {
  __typename: "ExternalAccounts";
  account: Accounts;
  accessToken: string;
}

export interface UserFields {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  linkedAccounts: UserFields_linkedAccounts[] | null;
  isOnline: boolean;
}
