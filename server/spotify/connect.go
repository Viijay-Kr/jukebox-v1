package spotify

import "net/http"

var ClientId = "cc77b57b74a84f4ea4faaf3993a07d34"
var ClientSecret = "52394174f0b847119c641a8c90c31da4"

// Connect will authorize spotify and redirect to auth
func Connect() string {
	return "https://accounts.spotify.com/authorize?client_id=" + ClientId + "&response_type=code&state=34fFs29kd09&scope=streaming,user-read-email,user-read-private,user-modify-playback-state,user-read-playback-state&redirect_uri=http://localhost:3000/linkAccount"
}

// SpotifyAPIHost this is the main api host of spotify
var SpotifyAPIHost = "https://api.spotify.com/v1/"

// SetDefaultRequestHeaders sets the default request headers
func SetDefaultRequestHeaders(request *http.Request, token string) {
	request.Header.Set("Authorization", "Bearer "+token)
	request.Header.Set("Accept", "application/json")
	request.Header.Set("Content-type", "application/json")
}
