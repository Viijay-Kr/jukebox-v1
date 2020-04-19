import React from "react";
import Grid from "./Grid";
import Tile, { Title } from "./Tile";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PlaylistsContext } from "../../../contexts/PlaylistsContext";

export const TileWithImage = styled("div")<{ image?: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #000;
  height: 100%;
  width: 100%;
`;

function Tiles(props: RouteComponentProps) {
  const playlistContext = React.useContext(PlaylistsContext);

  if (!playlistContext?.playlists) {
    return null;
  }
  const { playlists } = playlistContext;
  const onPlaylistSelect = (id: string) => {
    props.history.push(`/playlist/${id}`);
  };
  return (
    <Grid>
      {playlists &&
        playlists.map((item, index) => (
          <Tile
            key={item.id}
            no={index + 1}
            onClick={() => onPlaylistSelect(item.id)}
          >
            <TileWithImage
              className="tile-image"
              key={item.id}
              image={
                item.images.length
                  ? item.images.filter((i) => i.width === 300)[0].url
                  : ""
              }
            ></TileWithImage>
            <Title className={"hidden"}>{item.name}</Title>
          </Tile>
        ))}
    </Grid>
  );
}

export default withRouter(Tiles);
