package songs

import (
	"github.com/VijayKrish93/jukebox/db"
	"github.com/VijayKrish93/jukebox/logger"
	"go.mongodb.org/mongo-driver/bson"
)

// FindSongsInDB finds all the songs from the db
func FindSongsInDB() ([]*Song, error) {
	songsCollection := db.Collection("songs")
	filter := bson.D{{}}
	cursor, err := songsCollection.Find(db.Context, filter)
	logger.PanicErr(err)
	var results []*Song
	for cursor.Next(db.Context) {
		var elem Song
		err := cursor.Decode(&elem)
		if err != nil {
			return nil, err
		}
		results = append(results, &elem)
	}
	return results, nil
}

// FindSongByID returns song by id
func FindSongByID(id string) (*Song, error) {
	songsCollection := db.Collection("songs")
	filter := bson.D{{"id", id}}
	var song *Song
	songsCollection.FindOne(db.Context, filter).Decode(&song)
	if song != nil {
		return song, nil
	}
	return nil, nil
}


