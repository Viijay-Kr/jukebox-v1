import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import {
  getAccessToken,
  getAccessTokenVariables,
} from "../../../generated/getAccessToken";
import {
  linkAccountToUser,
  linkAccountToUserVariables,
} from "../../../generated/linkAccountToUser";
import { UserContext } from "../../../contexts/UserContext";
import { Accounts } from "../../../generated/globalTypes";

export const linkAnAccountQuery = gql`
  mutation linkAccountToUser($id: ID!, $account: Accounts!) {
    linkAccount(id: $id, account: $account)
  }
`;

export const tokenHandShakeQuery = gql`
  mutation getAccessToken($code: String!, $id: ID!) {
    tokenHandShake(code: $code, id: $id) {
      id
      email
    }
  }
`;

export function useLinkAccountMutation() {
  const [linkAccount, { data }] = useMutation<
    linkAccountToUser,
    linkAccountToUserVariables
  >(linkAnAccountQuery);

  React.useEffect(() => {
    if (data && data.linkAccount) {
      window.location.href = data.linkAccount;
    }
  }, [data]);

  return { linkAccounts: linkAccount, linkAccount: data?.linkAccount };
}

export function useTokenHandShakeMutation(
  location: RouteComponentProps["location"],
  setLoadingState: (state: boolean) => void,
  history: RouteComponentProps["history"]
) {
  const [getAccessTokenMutation, { data }] = useMutation<
    getAccessToken,
    getAccessTokenVariables
  >(tokenHandShakeQuery);
  const { setActiveLinkedAccount } = React.useContext(UserContext);
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code) {
      setLoadingState(true);
      getAccessTokenMutation({ variables: { code, id: user?.id } });
    }
    // eslint-disable-next-line
  }, [getAccessTokenMutation, location.search, setLoadingState]);

  React.useEffect(() => {
    if (data?.tokenHandShake) {
      setLoadingState(false);
      setActiveLinkedAccount(Accounts.SPOTIFY);
      history.push("/playlists");
    }
  }, [history, setLoadingState, data, setActiveLinkedAccount]);

  return data?.tokenHandShake;
}
