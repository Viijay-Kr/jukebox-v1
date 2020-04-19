import { useRef, useState, useEffect } from "react";
import { TrackFields } from "../../../../../generated/TrackFields";
import { useSpotifyPlayer } from "../../Track/hooks/useSpotifyPlayer";

export interface MediaPlayerControls {
  playTrackAtIndex: (index: number) => void;
  playPreviousTrack: () => void;
  playNextTrack: () => void;
  play: () => void;
  pause: () => void;
  shuffle: () => void;
}
export function useMediaPlayer(tracks?: TrackFields[] | null) {
  const [activeTrack, setActiveTrack] = useState<TrackFields | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const spotifyPlayer = useSpotifyPlayer(activeTrack?.id);
  const mediaPlayerRef = useRef<MediaPlayerControls>();

  useEffect(() => {
    if (!isPlaying && spotifyPlayer?.state) {
      spotifyPlayer?.pause();
    } else {
      if (spotifyPlayer?.state) spotifyPlayer?.resume();
    }
  }, [spotifyPlayer, isPlaying]);

  useEffect(() => {
    if (activeTrack) {
      if (!spotifyPlayer?.state) {
        spotifyPlayer?.play();
        setIsPlaying(true);
      }
    }
  }, [activeTrack, spotifyPlayer]);

  const playTrackAtIndex = (index: number) => {
    if (tracks && tracks[index]) {
      setActiveTrack(tracks[index]);
    } else {
      setActiveTrack(null);
    }
  };
  const playAtRandomIndex = () => {
    if (tracks) {
      const randomIndex = Math.floor(Math.random() * Math.max(tracks?.length));
      playTrackAtIndex(randomIndex);
    }
  };
  const playPreviousTrack = () => {
    if (activeTrack) {
      const activeTrackIndex = tracks?.findIndex(
        (track) => track.name === activeTrack.name
      );
      if (typeof activeTrackIndex !== "undefined")
        playTrackAtIndex(activeTrackIndex - 1);
    }
  };
  const playNextTrack = () => {
    if (activeTrack) {
      const activeTrackIndex = tracks?.findIndex(
        (track) => track.name === activeTrack.name
      );
      if (typeof activeTrackIndex !== "undefined")
        playTrackAtIndex(activeTrackIndex + 1);
    }
  };
  const play = () => {
    if (spotifyPlayer?.state) {
      setIsPlaying(true);
    } else {
      playTrackAtIndex(0);
    }
  };

  const pause = () => {
    if (spotifyPlayer?.state) {
      setIsPlaying(false);
    }
  };

  const shuffle = () => {
    if (spotifyPlayer?.state && tracks) {
      setIsPlaying(true);
      playAtRandomIndex();
    } else {
      playAtRandomIndex();
    }
  };
  mediaPlayerRef.current = {
    playTrackAtIndex,
    playPreviousTrack,
    playNextTrack,
    play,
    pause,
    shuffle,
  };
  return {
    mediaControl: mediaPlayerRef.current,
    spotifyPlayer,
    isPlaying,
    setActiveTrack,
    setIsPlaying,
    activeTrack,
  };
}
