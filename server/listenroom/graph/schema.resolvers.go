package listen

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
)

func (r *mutationResolver) Post(ctx context.Context, text string, username string, roomName string) (*Message, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) RequestToListen(ctx context.Context, playlistID string, username string, senderID string, receiverID string, roomName string) (*ListenRoom, error) {
	r.Lock()
	room := r.rooms[roomName]
	request := &ListenRequest{
		SenderID:   senderID,
		SenderName: username,
		Room:       room,
	}
	if r.requests == nil {
		r.requests = make(map[string][]*ListenRequest)
	}
	requests := r.requests[receiverID]
	if &requests == nil {
		r.requests[receiverID] = append(r.requests[receiverID], request)
	} else {
		r.requests[receiverID] = append(r.requests[receiverID], request)
	}
	r.Unlock()

	return room, nil
}

func (r *mutationResolver) JoinRoom(ctx context.Context, roomName string, userID string, username string) (*ListenRoom, error) {
	room := r.rooms[roomName]
	if &room == nil {
		return nil, fmt.Errorf("room not active anymore")
	}
	listener := Listener{
		ID:   userID,
		Name: username,
	}
	room.Listeners = append(room.Listeners, &listener)
	r.Lock()
	for _, ch := range r.listeners {
		ch <- &listener
	}
	r.Unlock()
	return room, nil
}

func (r *mutationResolver) CreateRoom(ctx context.Context, roomName string, owner string, playlistID string) (*ListenRoom, error) {
	r.Lock()
	room := r.rooms[roomName]
	if room == nil {
		room = &ListenRoom{
			Name:       roomName,
			Owner:      owner,
			PlaylistID: playlistID,
			Messages:   []*Message{},
			Listeners:  []*Listener{},
		}
		if r.rooms == nil {
			r.rooms = make(map[string]*ListenRoom)
		}
		r.rooms[roomName] = room
	}
	r.Unlock()
	return room, nil
}

func (r *queryResolver) Room(ctx context.Context, name string) (*ListenRoom, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Requests(ctx context.Context, id string) ([]*ListenRequest, error) {
	return r.requests[id], nil
}

func (r *subscriptionResolver) MessageAdded(ctx context.Context, roomName string) (<-chan *Message, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) ListenerJoined(ctx context.Context, roomName string) (<-chan *Listener, error) {
	room := r.rooms[roomName]
	if &room == nil {
		return nil, fmt.Errorf("Room does not exist")
	}
	listeners := make(chan *Listener, 1)
	r.Lock()
	if r.listeners == nil {
		r.listeners = make(map[string]chan *Listener)
	}
	r.listeners[roomName] = listeners
	r.Unlock()
	go func() {
		<-ctx.Done()
		r.Lock()
		delete(r.listeners, roomName)
		r.Unlock()
	}()
	return listeners, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// Subscription returns SubscriptionResolver implementation.
func (r *Resolver) Subscription() SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
