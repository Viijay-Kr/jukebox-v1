package main

import (
	"github.com/VijayKrish93/jukebox/db"
	"github.com/sirupsen/logrus"
)

func main() {
	logrus.Info("Starting Mongo DB")
	db.Connect()
}
