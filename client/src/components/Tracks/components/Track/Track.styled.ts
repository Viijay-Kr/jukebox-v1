import styled from "styled-components";
const playIcon = require("../../../../icons/play.svg");
const pauseIcon = require("../../../../icons/pause.svg");
export const MediaIcon = styled.i`
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: #fff;
  visibility: hidden;
  top: 30px;
  left: 28px;
  mask-repeat: no-repeat;
  z-index: 1000;
`;
export const PauseIcon = styled(MediaIcon)`
  mask-image: url(${pauseIcon});
`;
export const PlayIcon = styled(MediaIcon)`
  mask-image: url(${playIcon});
`;

export const TrackItem = styled.div`
  font-family: AvenirNext-DemiBold;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 5px;
  }
`;
export const Name = styled.span`
  font-size: 14px;
  letter-spacing: 0.42px;
`;
export const Artist = styled.span`
  font-size: 12px;
  letter-spacing: 0.42px;
`;
export const Album = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.42px;
`;

export const TrackAlbumArt = styled.div<{ image?: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #000;
  width: 64px;
  height: 64px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: rgba(255, 255, 255, 0.7);
  min-height: 75px;
  padding-top: 7px;
  padding-left: 7px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  &:hover {
    cursor: pointer;
    ${TrackAlbumArt} {
      opacity: 0.3;
      transition: opacity 0.3s;
    }
    ${MediaIcon} {
      visibility: visible;
    }
  }
  .keep-hover {
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.3s;
  }
  .is-playing {
    visibility: visible;
  }
`;
