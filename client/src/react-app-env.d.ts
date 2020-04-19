/// <reference types="react-scripts" />
interface Window {
  onSpotifyWebPlaybackSDKReady: () => void;
  Spotify: {
    Player: any;
  };
  spotifyDeviceId: string;
  SpotifyPlayer: {
    _options: {
      getAuthToken: (cb: (token: string) => {}) => void;
    };
  };
}
