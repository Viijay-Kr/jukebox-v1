package playlists

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/VijayKrish93/jukebox/db"
	"github.com/VijayKrish93/jukebox/logger"
	users "github.com/VijayKrish93/jukebox/users/graph"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (r *mutationResolver) CreatePlaylist(ctx context.Context, playlist *NewPlaylist) (*Playlist, error) {
	playlistCollection := db.Collection("playlists")
	user := users.FindUsersByID(playlist.UserID)
	newPlaylist := &Playlist{
		Name: playlist.Name,
		ID:   fmt.Sprintf("P%d", rand.Intn(1000)),
		User: &User{
			ID:   user.ID,
			Name: user.Name,
		},
	}
	_, err := playlistCollection.InsertOne(db.Context, newPlaylist)
	logger.PanicErr(err)
	return newPlaylist, nil
}

func (r *mutationResolver) DeletePlaylist(ctx context.Context, id string) (*Playlist, error) {
	playlistCollection := db.Collection("playlists")
	filter := bson.D{{"id", id}}
	var deletedPlaylist *Playlist
	result := playlistCollection.FindOneAndDelete(db.Context, filter).Decode(&deletedPlaylist)
	logrus.Info("Playlist Deleted", result)
	return deletedPlaylist, nil
}

func (r *mutationResolver) AddSongToPlaylist(ctx context.Context, input *NewSong) (*Playlist, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteSongFromPlaylist(ctx context.Context, id string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Playlists(ctx context.Context, userID string) ([]*Playlist, error) {
	playlists, err := FindPlaylistByUserID(userID)
	return playlists, err
}

func (r *queryResolver) PlaylistByID(ctx context.Context, id string) (*Playlist, error) {
	playlists, err := FindPlaylistByID(id)
	logger.PanicErr(err)
	return &playlists, nil
}

func (r *userResolver) Playlists(ctx context.Context, obj *User, account Accounts) ([]*Playlist, error) {
	accessToken, refreshToken := users.GetUserTokenByExternalAccount(obj.ID, account.String())
	playlistsCollection := db.Collection("playlists")
	spotifyPlaylists, err := GetPlaylistsOfUser(accessToken, refreshToken)
	if err != nil {
		logrus.Panic(err)
	}
	var results []*Playlist
	for i := 0; i < len(spotifyPlaylists.Items); i++ {
		playlistItem := spotifyPlaylists.Items[i]
		playlist := Playlist{
			ID:          playlistItem.ID,
			Name:        playlistItem.Name,
			Images:      playlistItem.Images,
			Description: &playlistItem.Description,
			Account:     &account,
			User: &User{
				ID:   obj.ID,
				Name: obj.Name,
			},
		}
		opts := options.Update().SetUpsert(true)
		_, err := playlistsCollection.UpdateOne(db.Context, bson.D{{"id", playlist.ID}}, bson.D{{"$set", playlist}}, opts)
		logger.PanicErr(err)
		if err == nil {
			results = append(results, &playlist)
		}
	}
	return results, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// User returns UserResolver implementation.
func (r *Resolver) User() UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
