/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaylistById
// ====================================================

export interface getPlaylistById_playlistById_images {
  __typename: "Image";
  height: number;
  width: number;
  url: string;
}

export interface getPlaylistById_playlistById_tracks_album_images {
  __typename: "AlbumImage";
  height: number;
  width: number;
  url: string;
}

export interface getPlaylistById_playlistById_tracks_album {
  __typename: "Album";
  name: string;
  images: getPlaylistById_playlistById_tracks_album_images[];
}

export interface getPlaylistById_playlistById_tracks_artist {
  __typename: "Artist";
  name: string;
}

export interface getPlaylistById_playlistById_tracks {
  __typename: "ExternalTrack";
  id: string;
  name: string;
  album: getPlaylistById_playlistById_tracks_album;
  artist: getPlaylistById_playlistById_tracks_artist[] | null;
  previewUrl: string;
}

export interface getPlaylistById_playlistById {
  __typename: "Playlist";
  id: string;
  name: string;
  images: getPlaylistById_playlistById_images[];
  tracks: getPlaylistById_playlistById_tracks[] | null;
}

export interface getPlaylistById {
  playlistById: getPlaylistById_playlistById;
}

export interface getPlaylistByIdVariables {
  id: string;
}
