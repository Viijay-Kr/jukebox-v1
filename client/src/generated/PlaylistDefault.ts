/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistDefault
// ====================================================

export interface PlaylistDefault_images {
  __typename: "Image";
  height: number;
  width: number;
  url: string;
}

export interface PlaylistDefault {
  __typename: "Playlist";
  id: string;
  name: string;
  images: PlaylistDefault_images[];
}
