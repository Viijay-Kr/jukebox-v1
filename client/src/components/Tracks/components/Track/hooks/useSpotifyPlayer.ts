import React from "react";
import { UserContext } from "../../../../../contexts/UserContext";
import { Accounts } from "../../../../../generated/globalTypes";

export function useSpotifyPlayer(trackId?: string) {
  const [state, setPlayState] = React.useState(false);
  const [playbackState, setPlayBack] = React.useState<{
    progress_ms: number;
    duration_ms: number;
  } | null>(null);
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const access_token = user?.linkedAccounts?.find(
    ({ account }) => account === Accounts.SPOTIFY
  )?.accessToken;

  React.useEffect(() => {
    setPlayState(false);
  }, [trackId]);

  const playBack = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await response.json();
      setPlayState(true);
      setPlayBack({
        progress_ms: data.progress_ms,
        duration_ms: data.item.duration_ms,
      });
    } catch (e) {
      console.error(e);
    }
  }, [access_token]);

  const play = React.useCallback(async () => {
    const response = await fetch(
      //@ts-ignore
      `https://api.spotify.com/v1/me/player/play?device_id=${window.spotifyDeviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response) {
      window.setTimeout(() => playBack(), 1000);
    }
  }, [trackId, access_token, playBack]);

  if (!userContext) {
    return null;
  }

  const pause = () => {
    //@ts-ignore
    window.SpotifyPlayer.pause();
  };
  const resume = () => {
    //@ts-ignore
    window.SpotifyPlayer.resume();
  };
  return { trackId, state, play, pause, resume, playBack, playbackState };
}
