package common

import (
	"go.uber.org/zap"
	"log"
)

//NewLOG gets a new zap dev logger
func NewLOG() (*zap.Logger, error) {
	logger, err := zap.NewDevelopment()
	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
		return nil, err
	}
	return logger, nil
}
