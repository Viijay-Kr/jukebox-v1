// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package songs

import (
	"fmt"
	"io"
	"strconv"
)

type Album struct {
	ID     string        `json:"id"`
	Name   string        `json:"name"`
	Images []*AlbumImage `json:"images"`
}

type AlbumImage struct {
	Height int    `json:"height"`
	Width  int    `json:"width"`
	URL    string `json:"url"`
}

type Artist struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

type ExternalTrack struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Href        string    `json:"href"`
	ExternalIds []string  `json:"externalIds"`
	Explicit    bool      `json:"explicit"`
	Type        string    `json:"type"`
	URI         string    `json:"uri"`
	Album       *Album    `json:"album"`
	Artist      []*Artist `json:"artist"`
	PreviewURL  string    `json:"previewUrl"`
}

type Playlist struct {
	ID     string           `json:"id"`
	Tracks []*ExternalTrack `json:"tracks"`
}

func (Playlist) IsEntity() {}

type Song struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (Song) IsEntity() {}

type Accounts string

const (
	AccountsSpotify Accounts = "SPOTIFY"
	AccountsApple   Accounts = "APPLE"
)

var AllAccounts = []Accounts{
	AccountsSpotify,
	AccountsApple,
}

func (e Accounts) IsValid() bool {
	switch e {
	case AccountsSpotify, AccountsApple:
		return true
	}
	return false
}

func (e Accounts) String() string {
	return string(e)
}

func (e *Accounts) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Accounts(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Accounts", str)
	}
	return nil
}

func (e Accounts) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
