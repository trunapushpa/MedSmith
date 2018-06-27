package relations

import (
	"net/http"
	"encoding/json"
	"medsmith-backend/web-server/common"
	"medsmith-backend/web-server/users"
)

type singleHospital struct {
	Id    int    `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

type out2 struct {
	Success bool             `json:"success"`
	Message []singleHospital `json:"message"`
}

func GetAllHos(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := users.Store.Get(r, "session")

		// Check if user is authenticated && user is patient
		if auth, ok := session.Values["authenticated"].(bool); !ok || !auth || (session.Values["type"] != "patient") {
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Not authorised"})
			env.LOG.Info("Not authorised")
			return
		}

		sqlStatement := "SELECT id, email_address, name FROM users.hospital"
		rows, err := env.DB.Query(sqlStatement)
		if err != nil {
			env.LOG.Error("Get Hospital List")
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
			return
		}
		defer rows.Close()

		var id int
		var email, name string
		var hosList []singleHospital

		for rows.Next() {
			err := rows.Scan(&id, &email, &name)
			if err != nil {
				env.LOG.Error("Get Hospital List")
				json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
				return
			}
			hosList = append(hosList, singleHospital{Id: id, Name: name, Email: email})
		}
		if err := rows.Err(); err != nil {
			env.LOG.Error("Get Hospital List")
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
			return
		}
		env.LOG.Info("Got Hospital List")
		json.NewEncoder(w).Encode(out2{Success: true, Message: hosList})
	}

}
