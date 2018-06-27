package users

import (
	"net/http"
	"fmt"
	"encoding/json"
	"medsmith-backend/web-server/common"
)

type userDetails struct {
	Id int `json:"id"`
	Email string `json:"email"`
	Name string `json:"name"`
	Type string `json:"type"`
}

type out struct {
	Success bool `json:"success"`
	Message userDetails `json:"message"`
}

func AuthCheck(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := Store.Get(r, "session")

		// Check if user is authenticated
		if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
			json.NewEncoder(w).Encode(Out{false, "Not Logged In"})
			env.LOG.Info("Not logged In")
			return
		}

		var name, email string
		var id int
		sqlStatement := fmt.Sprintf("SELECT id, concat(first_name, ' ', last_name) AS name, email_address as email FROM users.patient WHERE id = %d",session.Values["id"])
		err := env.DB.QueryRow(sqlStatement).Scan(&id,&name,&email)

		if err != nil {
			json.NewEncoder(w).Encode(Out{false, "Not Logged In"})
			env.LOG.Info("Not logged In")
			return
		}

		user := userDetails{id, email, name, fmt.Sprint(session.Values["type"])}

		// Visible only to authenticated user
		json.NewEncoder(w).Encode(out{true,user})
		env.LOG.Info("Logged In")
	}

}
