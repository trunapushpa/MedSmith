package relations

import (
	"net/http"
	"encoding/json"
	"medsmith-backend/web-server/common"
	"medsmith-backend/web-server/users"
)

type singleDoc struct {
	Id int `json:"id"`
	Email string `json:"email"`
	Name string `json:"name"`
}

type out struct {
	Success bool `json:"success"`
	Message []singleDoc `json:"message"`
}

func GetAllDocs(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := users.Store.Get(r, "session")

		// Check if user is authenticated && user is patient
		if auth, ok := session.Values["authenticated"].(bool); !ok || !auth || (session.Values["type"] != "patient") {
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Not authorised"})
			env.LOG.Info("Not authorised")
			return
		}

		sqlStatement := "SELECT id, email_address, concat(first_name, ' ', last_name) AS name FROM users.doctor"
		rows, err := env.DB.Query(sqlStatement)
		if err != nil {
			env.LOG.Error("Get Docs List")
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
			return
		}
		defer rows.Close()

		var id int
		var email, name string
		var docsList []singleDoc

		for rows.Next() {
			err := rows.Scan(&id, &email, &name)
			if err != nil {
				env.LOG.Error("Get Docs List")
				json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
				return
			}
			docsList = append(docsList, singleDoc{Id: id, Name: name, Email: email})
		}
		if err := rows.Err(); err != nil {
			env.LOG.Error("Get Docs List")
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
			return
		}
		env.LOG.Info("Got Docs List")
		json.NewEncoder(w).Encode(out{Success:true, Message:docsList})
	}

}
