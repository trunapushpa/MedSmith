package users

import (
	"github.com/gorilla/sessions"
)

var (
	Key   = []byte("super-secret-key")
	Store = sessions.NewCookieStore(Key)
)

type Out struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}