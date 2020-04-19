import React from "react";
import { gql } from "apollo-boost";
import { TracksFragment, PlaylistsFragment } from "../fragments";
import { useQuery } from "@apollo/react-hooks";
import { TrackFields } from "../../generated/TrackFields";
import {
  getPlaylistById,
  getPlaylistByIdVariables,
} from "../../generated/getPlaylistById";
import { PlaylistFields } from "../../generated/PlaylistFields";

export interface ITracks {
  playlistMeta: Partial<PlaylistFields>;
  tracks: TrackFields[] | null;
}
export const TracksContext = React.createContext<ITracks | null>(null);

const queryPlaylistById = gql`
  query getPlaylistById($id: ID!) {
    playlistById(id: $id) {
      ...PlaylistDefault
      tracks {
        ...TrackFields
      }
    }
  }
  ${TracksFragment}
  ${PlaylistsFragment}
`;

export interface IProps {
  id: string;
  children: React.ReactElement;
}
export default function TracksContextProvider(props: IProps) {
  const { data } = useQuery<getPlaylistById, getPlaylistByIdVariables>(
    queryPlaylistById,
    { variables: { id: props.id } }
  );
  if (!data) {
    return null;
  }
  const { playlistById } = data;
  return (
    <TracksContext.Provider
      value={{
        tracks: playlistById.tracks,
        playlistMeta: { name: playlistById.name, images: playlistById.images },
      }}
    >
      {props.children}
    </TracksContext.Provider>
  );
}
