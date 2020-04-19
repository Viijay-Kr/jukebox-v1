package songs

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/VijayKrish93/jukebox/logger"
	"github.com/VijayKrish93/jukebox/spotify"
	users "github.com/VijayKrish93/jukebox/users/graph"
)

type SpotifyAlbum struct {
	ID     string              `json:"id"`
	Name   string              `json:"name"`
	Images []SpotifyAlbumImage `json:"images"`
}
type SpotifyArtist struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}
type SpotifyAlbumImage struct {
	Height int    `json:"height"`
	Width  int    `json:"width"`
	URL    string `json:"url"`
}
type SpotifyTrack struct {
	ID          string          `json:"id"`
	Name        string          `json:"name"`
	Album       SpotifyAlbum    `json:"album"`
	Artist      []SpotifyArtist `json:"artists"`
	Explicit    bool            `json:"explicit"`
	ExternalIDS []*string       `json:"external_ids"`
	Href        string          `json:"href"`
	Type        string          `json:"type"`
	URI         string          `json:"uri"`
	PreviewURL  string          `json:"preview_url"`
}

type SpotifyTrackItems struct {
	Track *SpotifyTrack `json:"track"`
}
type SpotifyTracksResponse struct {
	Items []*SpotifyTrackItems `json:"items"`
}

// GetTracksInPlaylists returns the tracks in a spotify playlist
func GetTracksInPlaylists(playlistID string, token string, refreshToken string) ([]*ExternalTrack, error) {
	client := http.Client{}
	requestURI := spotify.SpotifyAPIHost + "playlists/" + playlistID + "/tracks"
	request, err := http.NewRequest("GET", requestURI, nil)
	if err != nil {
		panic(err)
	}
	spotify.SetDefaultRequestHeaders(request, token)
	response, err := client.Do(request)
	logger.PanicErr(err)
	if response.StatusCode == 401 {
		authResponse, err := users.RefreshAccessToken(refreshToken)
		logger.PanicErr(err)
		return GetTracksInPlaylists(authResponse.AccessToken, playlistID, authResponse.RefreshToken)
	}
	var tracksResponse SpotifyTracksResponse
	responseInByte, err := ioutil.ReadAll(response.Body)
	logger.PanicErr(err)
	json.Unmarshal(responseInByte, &tracksResponse)
	var externalTracks []*ExternalTrack
	for i := 0; i < len(tracksResponse.Items); i++ {
		album := Album{
			Name: tracksResponse.Items[i].Track.Album.Name,
		}
		albumImages := tracksResponse.Items[i].Track.Album.Images
		for k := 0; k < len(albumImages); k++ {
			albumImage := AlbumImage{
				Height: albumImages[k].Height,
				Width:  albumImages[k].Width,
				URL:    albumImages[k].URL,
			}
			album.Images = append(album.Images, &albumImage)
		}
		var artists []*Artist
		spotifyArtist := tracksResponse.Items[i].Track.Artist
		for j := 0; j < len(spotifyArtist); j++ {
			artists = append(artists, &Artist{
				Name: spotifyArtist[j].Name,
			})
		}
		track := ExternalTrack{
			ID:         tracksResponse.Items[i].Track.ID,
			Name:       tracksResponse.Items[i].Track.Name,
			Album:      &album,
			Artist:     artists,
			PreviewURL: tracksResponse.Items[i].Track.PreviewURL,
		}
		externalTracks = append(externalTracks, &track)
	}
	return externalTracks, nil
}
