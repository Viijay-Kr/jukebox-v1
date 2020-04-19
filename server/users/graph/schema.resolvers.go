package users

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"
	"math/rand"

	"github.com/VijayKrish93/jukebox/db"
	"github.com/VijayKrish93/jukebox/logger"
	"github.com/VijayKrish93/jukebox/spotify"
	"go.mongodb.org/mongo-driver/bson"
)

func (r *mutationResolver) CreateUser(ctx context.Context, user NewUser) (*User, error) {
	newuser := &User{
		Name:           user.Name,
		ID:             fmt.Sprintf("T%d", rand.Intn(100)),
		LinkedAccounts: []*ExternalAccounts{},
		Email:          user.Email,
		IsOnline:       true,
	}

	// Send to a collection here
	currentUsers, userCollection := FindUsersInDB()
	for i := 0; i < len(currentUsers); i++ {
		if newuser.Email == currentUsers[i].Email {
			return newuser, nil
		}
	}
	_, err := userCollection.InsertOne(db.Context, newuser)
	logger.PanicErr(err)
	return newuser, nil
}

func (r *mutationResolver) LinkAccount(ctx context.Context, id string, account Accounts) (string, error) {
	// Connect spotify here
	if account.String() == AccountsSpotify.String() {
		authorizeURI := spotify.Connect()
		log.Printf(">> authorizeURI", authorizeURI)
		return authorizeURI, nil
	}
	return "Not Linkable", nil
}

func (r *mutationResolver) TokenHandShake(ctx context.Context, code string, id string) (*User, error) {
	authResponse, err := Token(code)
	if err != nil {
		panic(err)
	}
	user, err := UpdateTokenByUserID(id, authResponse.AccessToken, authResponse.RefreshToken)
	return user, err
}

func (r *queryResolver) Users(ctx context.Context) ([]*User, error) {
	users, _ := FindUsersInDB()
	return users, nil
}

func (r *queryResolver) GetLinkedAccounts(ctx context.Context, id string) ([]*ExternalAccounts, error) {
	filter := bson.D{{"id", id}}
	userCollection := db.Collection("users")
	var result *User
	err := userCollection.FindOne(db.Context, filter).Decode(&result)
	logger.PanicErr(err)
	return result.LinkedAccounts, nil
}

func (r *queryResolver) UserByID(ctx context.Context, id string) (*User, error) {
	user := FindUsersByID(id)
	return user, nil
}

func (r *queryResolver) Login(ctx context.Context, email string) (*User, error) {
	user, err := FindUsersByEmailID(email)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
