import React from "react";
import styled from "styled-components";
import Tiles from "./components/Tiles";
import Page from "../Page";
import { UserContext } from "../../contexts/UserContext";
import { ActiveIcon } from "../Footer";
import PlaylistsContextProvider from "../../contexts/PlaylistsContext";
import { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
const Container = styled("div")`
  background: #000;
  width: 95%;
  padding-left: 2.5%;
  top: 135px;
  padding-bottom: 83px;
  position: relative;
`;

function Playlists(props: RouteComponentProps) {
  const userContext = React.useContext(UserContext);
  const { user, activeAccount } = userContext;

  useEffect(() => {
    if (!user) {
      props.history.push("/?from=/playlists");
    }
    // eslint-disable-next-line
  }, [user]);
  if (!user || !activeAccount) {
    return null;
  }

  return (
    <Page headerTitle={"Your playlists"} activeFooterIcon={ActiveIcon.Playlist}>
      <PlaylistsContextProvider id={user?.id} account={activeAccount}>
        <Container>
          <Tiles />
        </Container>
      </PlaylistsContextProvider>
    </Page>
  );
}

export default withRouter(Playlists);
