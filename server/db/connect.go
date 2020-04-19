package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Context Database is exported

// Connect Exporting the database and context
func Connect() (context.Context, *mongo.Database) {
	ctx, _ := context.WithTimeout(context.Background(), 100000000*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Error connecting to database")
	}
	log.Printf("Connect to mongo client running at mongodb://localhost:27017")
	database := client.Database("jukebox")
	return ctx, database
}

// Context and Database are exported
var Context, Database = Connect()
