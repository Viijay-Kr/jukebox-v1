/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Accounts } from "./globalTypes";

// ====================================================
// GraphQL query operation: userLogin
// ====================================================

export interface userLogin_login_linkedAccounts {
  __typename: "ExternalAccounts";
  account: Accounts;
  accessToken: string;
}

export interface userLogin_login {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  linkedAccounts: userLogin_login_linkedAccounts[] | null;
  isOnline: boolean;
}

export interface userLogin {
  login: userLogin_login;
}

export interface userLoginVariables {
  email: string;
}
