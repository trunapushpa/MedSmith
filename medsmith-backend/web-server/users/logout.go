package users

import (
	"net/http"
	"encoding/json"
	"medsmith-backend/web-server/common"
)

func LogoutHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {

		session, _ := Store.Get(r, "session")

		if session.Values["authenticated"] == true {
			// Revoke users authentication
			session.Values["authenticated"] = false
			session.Save(r, w)
			json.NewEncoder(w).Encode(Out{true, "You are now logged out"})
			env.LOG.Info("User Logged Out")
			return
		}
		json.NewEncoder(w).Encode(Out{false, "You are not logged in"})
	}
}
