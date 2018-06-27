package common

import (
	"database/sql"
	"fmt"
	//pq is the postgres client
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "root"
	dbname   = "metabidb"
)

//NewDB gets the connection to the database
func NewDB() (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil { return nil, err }
	if err = db.Ping(); err != nil {
        return nil, err
    }
    return db, nil
}