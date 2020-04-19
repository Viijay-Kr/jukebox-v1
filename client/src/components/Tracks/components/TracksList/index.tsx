import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { TracksContext } from "../../../../contexts/TracksContext";
import Track from "../Track";
import {
  Tracks,
  Meta,
  Container,
  Header,
  Name,
  FixedHeader,
} from "./TrackList.styled";
import { useMediaPlayer } from "../Track/hooks/useMediaPlayer";
import MediaPlayer from "../MediaPlayer";
import ListenRoom from "../../../ListenRoom";

export function TracksList(props: RouteComponentProps) {
  const tracksContext = React.useContext(TracksContext);

  const {
    spotifyPlayer,
    mediaControl,
    activeTrack,
    setActiveTrack,
    setIsPlaying,
    isPlaying,
  } = useMediaPlayer(tracksContext?.tracks);

  if (!tracksContext) {
    return null;
  }
  const { playlistMeta, tracks } = tracksContext;

  if (!tracks) {
    return null;
  }
  const headerImage = playlistMeta.images?.find((item) => item.height === 640);
  return (
    <>
      <Container>
        <FixedHeader>
          <Header image={headerImage?.url} />
          <Meta>
            <Name>{playlistMeta.name}</Name>
            <MediaPlayer
              spotifyPlayer={spotifyPlayer}
              mediaControl={mediaControl}
              isPlaying={isPlaying}
              activeTrack={activeTrack || (tracks && tracks[0])}
            />
          </Meta>
        </FixedHeader>
        <Tracks>
          {tracks?.map((track, index) => (
            <Track
              track={track}
              index={index}
              key={track.name}
              activeTrack={activeTrack}
              setActiveTrack={setActiveTrack}
              playAtIndex={mediaControl.playTrackAtIndex}
              setPlayActiveTrack={setIsPlaying}
            />
          ))}
        </Tracks>
      </Container>
      <ListenRoom />
    </>
  );
}
export default withRouter(TracksList);
