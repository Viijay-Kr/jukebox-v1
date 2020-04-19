package playlists

import (
	"github.com/VijayKrish93/jukebox/db"
	"github.com/VijayKrish93/jukebox/logger"
	users "github.com/VijayKrish93/jukebox/users/graph"
	"go.mongodb.org/mongo-driver/bson"
)

// FindPlaylistByUserID returns all playlists in the db
func FindPlaylistByUserID(userID string) ([]*Playlist, error) {
	playlistCollection := db.Collection("playlists")
	userCollection := db.Collection("users")
	var results []*Playlist
	filter := bson.D{{"user", userID}}
	cursor, err := playlistCollection.Find(db.Context, filter)
	logger.PanicErr(err)
	for cursor.Next(db.Context) {
		var elem Playlist
		err := cursor.Decode(&elem)
		logger.PanicErr(err)
		results = append(results, &elem)
	}
	user := users.User{}
	userfilter := bson.D{{"id", userID}}
	mongoErr := userCollection.FindOne(db.Context, userfilter).Decode(&user)
	logger.PanicErr(mongoErr)
	var token string
	for i := 0; i < len(user.LinkedAccounts); i++ {
		account := user.LinkedAccounts[i]
		spotifyAccount := users.AccountsSpotify.String()
		if account.Account.String() == spotifyAccount {
			token = account.AccessToken
		}
	}
	externalPlaylists, err := GetPlaylistsOfUser(token, userID)
	for i := 0; i < len(externalPlaylists.Items); i++ {
		playlistItem := externalPlaylists.Items[i]
		playlist := Playlist{
			ID:     playlistItem.ID,
			Name:   playlistItem.Name,
			Images: playlistItem.Images,
		}
		results = append(results, &playlist)
	}
	return results, nil
}

// FindUserIDAndAccountByPlaylistID returns the userId by Playlist Id
func FindUserIDAndAccountByPlaylistID(id string) (string, string) {
	playlist, err := FindPlaylistByID(id)
	logger.PanicErr(err)
	return playlist.User.ID, playlist.Account.String()
}

// FindPlaylistByID returns the playlist by ID
func FindPlaylistByID(id string) (Playlist, error) {
	playlistCollection := db.Collection("playlists")
	filter := bson.D{{"id", id}}
	var playlist Playlist
	playlistCollection.FindOne(db.Context, filter).Decode(&playlist)
	return playlist, nil
}
