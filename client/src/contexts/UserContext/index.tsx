import React from "react";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { UserFragment } from "../fragments";
import {
  users_userById,
  users_userById_linkedAccounts,
} from "../../generated/users";
import { userLogin, userLoginVariables } from "../../generated/userLogin";
import {
  registerUser,
  registerUserVariables,
} from "../../generated/registerUser";
import { Accounts } from "../../generated/globalTypes";
import { UserFields } from "../../generated/UserFields";
interface IUserContext {
  user: Omit<users_userById, "playlists"> | null;
  loginUser: (email: string) => void;
  registerUser: (name: string, email: string) => void;
  setActiveLinkedAccount: (account: Accounts) => void;
  activeAccount: Accounts | null;
  isLoggedIn: boolean;
  loginStarted: boolean;
}
const userSession = window.localStorage.getItem("user");
export const UserContext = React.createContext<IUserContext>({
  user: null,
  loginUser: () => {},
  registerUser: () => {},
  setActiveLinkedAccount: () => {},
  activeAccount: null,
  isLoggedIn: false,
  loginStarted: false,
});

const loginQuery = gql`
  query userLogin($email: String!) {
    login(email: $email) {
      ...UserFields
    }
  }
  ${UserFragment}
`;

const registerQuery = gql`
  mutation registerUser($email: String!, $name: String!) {
    createUser(user: { email: $email, name: $name }) {
      ...UserFields
    }
  }
  ${UserFragment}
`;
interface IProps {
  children: React.ReactElement;
}

function UserContextProvider(props: IProps & RouteComponentProps) {
  const [user, setUser] = React.useState<UserFields | null>(
    userSession ? JSON.parse(userSession) : null
  );
  const [loginUser, { data, loading }] = useLazyQuery<
    userLogin,
    userLoginVariables
  >(loginQuery);
  const [createUser, registerData] = useMutation<
    registerUser,
    registerUserVariables
  >(registerQuery);

  const [
    activeLinkedAccounts,
    setActiveLinkedAccount,
  ] = React.useState<Accounts | null>(null);

  React.useEffect(() => {
    if (data?.login) {
      setUser(data.login);
    } else if (registerData.data?.createUser) {
      setUser(registerData.data?.createUser);
    }
  }, [data, registerData]);
  React.useEffect(() => {
    if (user?.linkedAccounts) {
      window.localStorage.setItem("user", JSON.stringify(user));
      ConnectExternalPlayer(user.linkedAccounts);
    }
    // eslint-disable-next-line
  }, [user, user?.linkedAccounts]);

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser: (email: string) => loginUser({ variables: { email } }),
        registerUser: (email: string, name: string) =>
          createUser({ variables: { email, name } }),
        activeAccount: user?.linkedAccounts
          ? user.linkedAccounts[0]?.account
          : activeLinkedAccounts,
        setActiveLinkedAccount,
        isLoggedIn: !!user,
        loginStarted: loading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function ConnectExternalPlayer(
  linkedAccounts: users_userById_linkedAccounts[]
) {
  const accessToken = linkedAccounts.find(
    ({ account }) => account === Accounts.SPOTIFY
  )?.accessToken;
  if (!window.onSpotifyWebPlaybackSDKReady) {
    const script = document.createElement("script");
    script.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (accessToken) {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb: (token: string) => void) => {
            console.log(">> accessToken", accessToken);
            cb(accessToken);
          },
        });
        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          console.log("Ready with Device ID", device_id);
          window.spotifyDeviceId = device_id;
        });
        player.addListener(
          "initialization_error",
          ({ message }: { message: string }) => {
            console.error(message);
          }
        );
        player.addListener(
          "authentication_error",
          ({ message }: { message: string }) => {
            console.error(message);
          }
        );
        player.addListener(
          "account_error",
          ({ message }: { message: string }) => {
            console.error(message);
          }
        );
        player.addListener(
          "playback_error",
          ({ message }: { message: string }) => {
            console.error(message);
          }
        );

        player.connect();
        window.SpotifyPlayer = player;
      }
    };
  }
}
export default withRouter(UserContextProvider);
