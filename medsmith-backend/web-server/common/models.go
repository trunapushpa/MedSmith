package common

import (
	"database/sql"
	"go.uber.org/zap"
)

//Env is environment variable for our server
type Env struct {
    DB *sql.DB
    LOG *zap.Logger
}