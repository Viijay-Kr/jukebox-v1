import { MediaIcon } from "../Track/Track.styled";
import styled from "styled-components";
const nextTrackIcon = require("../../../../icons/next.svg");
const previousTrackIcon = require("../../../../icons/prev.svg");
const playIcon = require("../../../../icons/play.svg");
const pauseIcon = require("../../../../icons/pause.svg");
const shuffleIcon = require("../../../../icons/shuffle.svg");
const podCastIcon = require("../../../../icons/podcast.svg");

export const PlayerContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Player = styled.div`
  display: flex;
  ${MediaIcon} {
    position: relative;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    visibility: visible;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);
  }
  flex-direction: row;
  margin-top: 10px;
  width: 200px;
  justify-content: space-between;
  align-items: center;
`;

export const NextTrack = styled(MediaIcon)`
  mask-image: url(${nextTrackIcon});
`;

export const PreviousTrack = styled(MediaIcon)`
  mask-image: url(${previousTrackIcon});
`;

export const PlayIcon = styled(MediaIcon)`
  mask-image: url(${playIcon});
`;
export const PauseIcon = styled(MediaIcon)`
  mask-image: url(${pauseIcon});
`;

export const ControlIcon = styled.i`
  position: relative;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  visibility: visible;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.7);
`;
export const Shuffle = styled(ControlIcon)`
  mask-image: url(${shuffleIcon});
  left: 8px;
`;
export const Podcasts = styled(ControlIcon)`
  mask-image: url(${podCastIcon});
  left: -8px;
`;

export const MediaIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
