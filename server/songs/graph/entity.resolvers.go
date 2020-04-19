package songs

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/VijayKrish93/jukebox/logger"
	playlists "github.com/VijayKrish93/jukebox/playlists/graph"
	users "github.com/VijayKrish93/jukebox/users/graph"
)

func (r *entityResolver) FindPlaylistByID(ctx context.Context, id string) (*Playlist, error) {
	userID, account := playlists.FindUserIDAndAccountByPlaylistID(id)
	accessToken, refreshToken := users.GetUserTokenByExternalAccount(userID, account)
	tracks, err := GetTracksInPlaylists(id, accessToken, refreshToken)
	logger.PanicErr(err)
	return &Playlist{
		Tracks: tracks,
	}, nil
}

func (r *entityResolver) FindSongByIDAndName(ctx context.Context, id string, name string) (*Song, error) {
	panic(fmt.Errorf("not implemented"))
}

// Entity returns EntityResolver implementation.
func (r *Resolver) Entity() EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
