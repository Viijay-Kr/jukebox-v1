import React from "react";
import { TrackFields } from "../../../../generated/TrackFields";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  TrackItem,
  TrackAlbumArt,
  PauseIcon,
  Container,
  PlayIcon,
  Name,
  Artist,
  Album,
} from "./Track.styled";
interface IProps {
  track: TrackFields;
  activeTrack: TrackFields | null;
  setActiveTrack: (track: TrackFields | null) => void;
  index: number;
  playAtIndex: (index: number) => void;
  setPlayActiveTrack: (state: boolean) => void;
}

export function Tracks(props: IProps & RouteComponentProps) {
  const { track, setActiveTrack, setPlayActiveTrack, activeTrack } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const albumArt = track.album.images.find((image) => image.height === 300);

  React.useEffect(() => {
    if (activeTrack?.id === track.id) {
      setIsPlaying(true);
    }
    return () => {
      setIsPlaying(false);
    };
  }, [activeTrack, track.id]);

  const onPlay = () => {
    setActiveTrack(track);
    setIsPlaying(true);
    setPlayActiveTrack(true);
  };
  const onPause = () => {
    setIsPlaying(false);
    setPlayActiveTrack(false);
  };
  return (
    <Container>
      {isPlaying ? (
        <PauseIcon onClick={onPause} className={"is-playing"} />
      ) : (
        <PlayIcon onClick={onPlay} />
      )}
      <TrackAlbumArt
        className={isPlaying ? "keep-hover" : ""}
        image={albumArt?.url}
      />
      <TrackItem>
        <Name>{track.name}</Name>
        <Artist>{track.artist?.map((artist) => artist.name).join(", ")}</Artist>
        <Album>{track.album?.name}</Album>
      </TrackItem>
    </Container>
  );
}

export default withRouter(Tracks);
