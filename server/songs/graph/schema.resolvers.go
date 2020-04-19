package songs

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
)

func (r *queryResolver) Songs(ctx context.Context) ([]*Song, error) {
	songs, err := FindSongsInDB()
	return songs, err
}

func (r *queryResolver) SongByID(ctx context.Context, id string) (*Song, error) {
	song, err := FindSongByID(id)
	return song, err
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
