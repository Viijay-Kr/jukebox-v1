package playlists

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/VijayKrish93/jukebox/logger"
	"github.com/VijayKrish93/jukebox/spotify"
	users "github.com/VijayKrish93/jukebox/users/graph"
)

// Image is the spotify image response object

// SpotifyPlaylist is the response type
type SpotifyPlaylist struct {
	ID          string   `json:"id"`
	Images      []*Image `json:"images"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
}

type SpotifyPlaylistResponse struct {
	Items []SpotifyPlaylist `json:"items"`
}

// GetPlaylistsOfUser returns the spotify playlists of a user
func GetPlaylistsOfUser(token string, refreshToken string) (*SpotifyPlaylistResponse, error) {
	client := http.Client{}
	requestURI := spotify.SpotifyAPIHost + "me/playlists"
	request, err := http.NewRequest("GET", requestURI, nil)
	logger.PanicErr(err)
	spotify.SetDefaultRequestHeaders(request, token)
	response, err := client.Do(request)
	if response.StatusCode == 401 {
		authResponse, err := users.RefreshAccessToken(refreshToken)
		logger.PanicErr(err)
		return GetPlaylistsOfUser(authResponse.AccessToken, refreshToken)
	}
	playlistRespone := SpotifyPlaylistResponse{}
	defer response.Body.Close()
	responseInByte, err := ioutil.ReadAll(response.Body)
	parseErr := json.Unmarshal(responseInByte, &playlistRespone)
	logger.PanicErr(parseErr)
	return &playlistRespone, err
}
