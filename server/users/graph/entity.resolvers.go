package users

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/sirupsen/logrus"
)

func (r *entityResolver) FindExternalAccountsByAccountAndUserID(ctx context.Context, account Accounts, userID string) (*ExternalAccounts, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *entityResolver) FindUserByIDAndName(ctx context.Context, id string, name string) (*User, error) {
	user := FindUsersByID(id)
	logrus.Info("user entity", name)
	return user, nil
}

// Entity returns EntityResolver implementation.
func (r *Resolver) Entity() EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
