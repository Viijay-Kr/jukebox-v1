package users

import (
	"log"

	"github.com/VijayKrish93/jukebox/db"
	"github.com/VijayKrish93/jukebox/logger"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// FindUsersInDB is a helper method to get users in the DB
func FindUsersInDB() ([]*User, *mongo.Collection) {
	userCollection := db.Collection("users")
	filter := bson.D{{}}
	var results []*User
	cursor, err := userCollection.Find(db.Context, filter)
	if err != nil {
		log.Fatal(err)
	}
	for cursor.Next(db.Context) {
		var elem User
		err := cursor.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, &elem)
	}
	return results, userCollection
}

// FindUsersByID is a helper to find users by id
func FindUsersByID(id string) *User {
	userCollection := db.Collection("users")
	filter := bson.D{{"id", id}}
	var result *User
	err := userCollection.FindOne(db.Context, filter).Decode(&result)
	logger.PanicErr(err)
	return result

}

// FindUsersByEmailID  is a helper to find users by email in DB
func FindUsersByEmailID(email string) (*User, error) {
	userCollection := db.Collection("users")
	filter := bson.D{{"email", email}}
	update := bson.D{{"$set", bson.D{{"isOnline", true}}}}
	var result *User
	err := userCollection.FindOneAndUpdate(db.Context, filter, update).Decode(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// UpdateTokenByUserID updates the token and links the spotify account
func UpdateTokenByUserID(id string, accessToken string, refreshToken string) (*User, error) {
	usersCollection := db.Collection("users")
	filter := bson.D{{"id", id}}
	linkedAccount := &ExternalAccounts{Account: AccountsSpotify, AccessToken: accessToken, RefreshToken: refreshToken, UserID: id}
	pushAccount := bson.D{{"$addToSet", bson.D{{"linkedaccounts", linkedAccount}}}}
	usersCollection.FindOneAndUpdate(db.Context, filter, bson.D{{"isOnline", true}})
	var result *User
	usersCollection.FindOneAndUpdate(db.Context, filter, pushAccount).Decode(&result)
	return result, nil
}

// GetUserToken returns the access and refresh token
func GetUserToken(userID string) (string, string) {
	userCollection := db.Collection("users")
	filter := bson.D{{"id", userID}}
	var user User
	userCollection.FindOne(db.Context, filter).Decode(&user)
	return user.LinkedAccounts[0].AccessToken, user.LinkedAccounts[0].RefreshToken
}

func GetUserTokenByExternalAccount(id string, account string) (string, string) {
	userCollection := db.Collection("users")
	filter := bson.D{{"id", id}, {"linkedaccounts.account", account}}
	var user User
	userCollection.FindOne(db.Context, filter).Decode(&user)
	return user.LinkedAccounts[0].AccessToken, user.LinkedAccounts[0].RefreshToken
}
