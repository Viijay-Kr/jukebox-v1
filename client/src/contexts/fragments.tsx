import { gql } from "apollo-boost";

export const PlaylistsFragment = gql`
  fragment PlaylistDefault on Playlist {
    id
    name
    images {
      height
      width
      url
    }
  }
`;

export const UserFragment = gql`
  fragment UserFields on User {
    id
    name
    email
    linkedAccounts {
      account
      accessToken
    }
    isOnline
  }
`;

export const TracksFragment = gql`
  fragment TrackFields on ExternalTrack {
    id
    name
    album {
      name
      images {
        height
        width
        url
      }
    }
    artist {
      name
    }
    previewUrl
  }
`;
