/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Accounts } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPlaylistByUserId
// ====================================================

export interface getPlaylistByUserId_userById_playlists_images {
  __typename: "Image";
  height: number;
  width: number;
  url: string;
}

export interface getPlaylistByUserId_userById_playlists {
  __typename: "Playlist";
  id: string;
  name: string;
  images: getPlaylistByUserId_userById_playlists_images[];
}

export interface getPlaylistByUserId_userById {
  __typename: "User";
  id: string;
  playlists: getPlaylistByUserId_userById_playlists[];
}

export interface getPlaylistByUserId {
  userById: getPlaylistByUserId_userById;
}

export interface getPlaylistByUserIdVariables {
  id: string;
  account: Accounts;
}
