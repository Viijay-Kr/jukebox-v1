package logger

import "github.com/sirupsen/logrus"

// PanicErr is a common helper to panic for errors
func PanicErr(err error) {
	if err != nil {
		logrus.Panic(err)
	}
}
