import React from "react";
import {
  Player,
  PreviousTrack,
  PauseIcon,
  PlayIcon,
  NextTrack,
  PlayerContainer,
  MediaIcons,
  Shuffle,
  Podcasts,
} from "./MediaPlayer.styled";
import ProgressBar from "../ProgressBar";
import { useSpotifyPlayer } from "../Track/hooks/useSpotifyPlayer";
import { MediaPlayerControls } from "../Track/hooks/useMediaPlayer";
import { TrackFields } from "../../../../generated/TrackFields";
import { ActiveTrackInfo } from "../TracksList/TrackList.styled";
import { Name, Artist, Album } from "../Track/Track.styled";
import { useContext } from "react";
import { TracksContext } from "../../../../contexts/TracksContext";
import { withRouter, RouteComponentProps } from "react-router-dom";
interface Props {
  spotifyPlayer: ReturnType<typeof useSpotifyPlayer>;
  mediaControl: MediaPlayerControls;
  isPlaying: boolean;
  activeTrack: TrackFields;
}
function MediaPlayer(props: Props & RouteComponentProps) {
  const tracksContext = useContext(TracksContext);
  const {
    mediaControl: { playPreviousTrack, playNextTrack, pause, play, shuffle },
    spotifyPlayer,
    isPlaying,
    activeTrack,
  } = props;

  const createRoom = () => {
    props.history.push(
      `${props.history.location.pathname}?room=${tracksContext?.playlistMeta.name}`
    );
  };
  return (
    <>
      <PlayerContainer>
        <Player>
          <PreviousTrack onClick={playPreviousTrack} />
          {isPlaying ? (
            <PauseIcon onClick={pause} />
          ) : (
            <PlayIcon onClick={play} />
          )}
          <NextTrack onClick={playNextTrack} />
        </Player>
        <MediaIcons>
          <Shuffle onClick={shuffle}></Shuffle>
          <Podcasts onClick={createRoom}></Podcasts>
        </MediaIcons>
        {spotifyPlayer?.playbackState?.duration_ms &&
          spotifyPlayer?.playbackState?.progress_ms && (
            <ProgressBar
              duration={spotifyPlayer?.playbackState?.duration_ms}
              progress={spotifyPlayer?.playbackState?.progress_ms}
              state={isPlaying}
            />
          )}
      </PlayerContainer>
      <ActiveTrackInfo>
        <Name>{activeTrack.name}</Name>
        <Artist>
          {activeTrack.artist?.map((item) => item.name).join(", ")}
        </Artist>
        <Album>{activeTrack.album.name}</Album>
      </ActiveTrackInfo>
    </>
  );
}

export default withRouter(MediaPlayer);
