package db

import (
	"log"

	"go.mongodb.org/mongo-driver/mongo"
)

// Collection creates  a collection and return the collection
func Collection(coll string) *mongo.Collection {
	collection := Database.Collection(coll)
	if collection == nil {
		log.Printf("Collection not available. So creating a collection")
		collection = Database.Collection(coll)
	}
	return collection
}
