package users

import (
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/VijayKrish93/jukebox/db"
	"github.com/VijayKrish93/jukebox/logger"
	"github.com/VijayKrish93/jukebox/spotify"
	"go.mongodb.org/mongo-driver/bson"
)

type AuthResponse struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	Scope        string `json:"scope"`
	Expiry       int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
}

// Token function reads the token from query and save in User DB
func Token(code string) (*AuthResponse, error) {
	client := http.Client{}
	postBody := url.Values{}
	postBody.Set("grant_type", "authorization_code")
	postBody.Set("code", code)
	postBody.Set("redirect_uri", "http://localhost:3000/linkAccount")
	newReq, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(postBody.Encode()))
	logger.PanicErr(err)
	SetRequestHeaders(newReq)
	res, tokenErr := client.Do(newReq)
	logger.PanicErr(tokenErr)
	authResponse := AuthResponse{}
	defer res.Body.Close()
	byteRes, err := ioutil.ReadAll(res.Body)
	logger.PanicErr(err)
	parseErr := json.Unmarshal(byteRes, &authResponse)
	logger.PanicErr(parseErr)
	// Make a sample request to play API
	logger.PanicErr(err)
	return &authResponse, err
}

// RefreshAccessToken handles token expiry between sessions
func RefreshAccessToken(refreshToken string) (*AuthResponse, error) {
	client := http.Client{}
	postBody := url.Values{}
	postBody.Set("grant_type", "refresh_token")
	postBody.Set("refresh_token", refreshToken)
	request, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(postBody.Encode()))
	SetRequestHeaders(request)
	response, err := client.Do(request)
	var authResponse AuthResponse
	responseInByte, err := ioutil.ReadAll(response.Body)
	json.Unmarshal(responseInByte, &authResponse)
	logger.PanicErr(err)
	UpdateTokenInDB(authResponse, refreshToken)
	return &authResponse, err
}

// SetRequestHeaders sets default request headers
func SetRequestHeaders(request *http.Request) {
	encoding := base64.StdEncoding.Strict()
	encodedInfo := encoding.EncodeToString([]byte(spotify.ClientId + ":" + spotify.ClientSecret))
	request.Header.Set("Authorization", "Basic "+encodedInfo)
	request.Header.Set("Content-type", "application/x-www-form-urlencoded")
}

// UpdateTokenInDB the new access token in DB
func UpdateTokenInDB(authResponse AuthResponse, oldToken string) {
	log.Println("old token", oldToken)
	usersCollection := db.Collection("users")
	filter := bson.D{{"linkedaccounts.refreshtoken", oldToken}}
	update := bson.D{{"$set", bson.D{{"linkedaccounts.$.accesstoken", authResponse.AccessToken}}}}
	var result User
	err := usersCollection.FindOneAndUpdate(db.Context, filter, update).Decode(&result)
	logger.PanicErr(err)
	log.Println(">> printing token", result.ID)
}
