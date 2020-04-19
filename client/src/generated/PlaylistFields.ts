/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistFields
// ====================================================

export interface PlaylistFields_images {
  __typename: "Image";
  height: number;
  width: number;
  url: string;
}

export interface PlaylistFields {
  __typename: "Playlist";
  id: string;
  name: string;
  images: PlaylistFields_images[];
}
