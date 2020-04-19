package listen

import "sync"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	sync.Mutex
	rooms     map[string]*ListenRoom
	requests  map[string][]*ListenRequest
	listeners map[string]chan *Listener
}
