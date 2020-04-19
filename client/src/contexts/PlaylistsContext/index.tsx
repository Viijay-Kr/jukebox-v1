import React from "react";
import { gql } from "apollo-boost";
import { PlaylistsFragment } from "../fragments";
import { useQuery } from "@apollo/react-hooks";
import { PlaylistFields } from "../../generated/PlaylistFields";
import {
  getPlaylistByUserId,
  getPlaylistByUserIdVariables,
} from "../../generated/getPlaylistByUserId";
import { Accounts } from "../../generated/globalTypes";
import PageLoader from "../../components/PageLoader";
export interface IPlaylists {
  playlists: PlaylistFields[];
}
export const PlaylistsContext = React.createContext<IPlaylists | null>(null);

const queryPlaylistsByUserId = gql`
  query getPlaylistByUserId($id: ID!, $account: Accounts!) {
    userById(id: $id) {
      id
      playlists(account: $account) {
        ...PlaylistDefault
      }
    }
  }
  ${PlaylistsFragment}
`;

export interface IProps {
  id: string;
  account: Accounts;
  children: React.ReactElement;
}
export default function PlaylistsContextProvider(props: IProps) {
  const { data, loading } = useQuery<
    getPlaylistByUserId,
    getPlaylistByUserIdVariables
  >(queryPlaylistsByUserId, {
    variables: { id: props.id, account: props.account },
  });
  if (!data) {
    return null;
  }
  const {
    userById: { playlists },
  } = data;
  return (
    <PlaylistsContext.Provider value={{ playlists }}>
      <>
        <PageLoader loading={loading} />
        {props.children}
      </>
    </PlaylistsContext.Provider>
  );
}
