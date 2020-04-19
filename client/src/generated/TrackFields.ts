/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackFields
// ====================================================

export interface TrackFields_album_images {
  __typename: "AlbumImage";
  height: number;
  width: number;
  url: string;
}

export interface TrackFields_album {
  __typename: "Album";
  name: string;
  images: TrackFields_album_images[];
}

export interface TrackFields_artist {
  __typename: "Artist";
  name: string;
}

export interface TrackFields {
  __typename: "ExternalTrack";
  id: string;
  name: string;
  album: TrackFields_album;
  artist: TrackFields_artist[] | null;
  previewUrl: string;
}
