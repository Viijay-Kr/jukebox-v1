import React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";
const playlistIcon = require("../../icons/playlist.svg");
const browseIcon = require("../../icons/browse.svg");
const homeIndicatorIcon = require("../../icons/homeIndicator.svg");
export const Container = styled.div`
  background: rgba(60, 60, 60, 0.9);
  width: 100%;
  height: 83px;
  position: fixed;
  bottom: 0;
  z-index: 99;
`;

const IconContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
`;
export const Icon = styled.i<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${props => (props.active ? "#FFCE4E" : "#fff")};
  mask-repeat: no-repeat;
`;

export const PlaylistIcon = styled(Icon)`
  mask-image: url(${playlistIcon});
`;
export const BrowseIcon = styled(Icon)`
  mask-image: url(${browseIcon});
`;

const IndicatorContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
export const HomeIndicator = styled(Icon)`
  background: #fff;
  mask-image: url(${homeIndicatorIcon});
  width: 140px;
`;

export enum ActiveIcon {
  Playlist,
  Browse
}

interface Props {
  activeIcon?: ActiveIcon;
}
function Footer(props: Props & RouteComponentProps) {
  const [activeIcon, setActiveIcon] = React.useState(props.activeIcon);
  const { history } = props;

  const onPlaylistClick = () => {
    setActiveIcon(ActiveIcon.Playlist);
    history.push("/playlists");
  };

  const onBrowseClick = () => {
    setActiveIcon(ActiveIcon.Browse);
    history.push("/browse");
  };
  return (
    <Container>
      <IconContainer>
        <PlaylistIcon
          onClick={onPlaylistClick}
          active={activeIcon === ActiveIcon.Playlist}
        />
        <BrowseIcon
          onClick={onBrowseClick}
          active={activeIcon === ActiveIcon.Browse}
        />
      </IconContainer>
      <IndicatorContainer>
        <HomeIndicator></HomeIndicator>
      </IndicatorContainer>
    </Container>
  );
}

export default withRouter(Footer);
