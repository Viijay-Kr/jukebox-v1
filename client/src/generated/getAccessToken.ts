/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: getAccessToken
// ====================================================

export interface getAccessToken_tokenHandShake {
  __typename: "User";
  id: string;
  email: string;
}

export interface getAccessToken {
  tokenHandShake: getAccessToken_tokenHandShake;
}

export interface getAccessTokenVariables {
  code: string;
  id: string;
}
