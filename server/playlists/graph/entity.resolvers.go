package playlists

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
)

func (r *entityResolver) FindPlaylistByIDAndNameAndAccount(ctx context.Context, id string, name string, account *Accounts) (*Playlist, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *entityResolver) FindUserByIDAndName(ctx context.Context, id string, name string) (*User, error) {
	// playlists, err := FindPlaylistByUserID(id)
	return &User{
		ID:   id,
		Name: name,
	}, nil
}

// Entity returns EntityResolver implementation.
func (r *Resolver) Entity() EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
