package relations

import (
	"net/http"
	"encoding/json"
	"medsmith-backend/web-server/common"
	"medsmith-backend/web-server/users"
	"fmt"
)

func GetDocs(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := users.Store.Get(r, "session")

		// Check if user is authenticated && user is patient
		if auth, ok := session.Values["authenticated"].(bool); !ok || !auth || (session.Values["type"] != "patient"){
			json.NewEncoder(w).Encode(users.Out{Success:false, Message:"Not authorised"})
			env.LOG.Info("Not authorised")
			return
		}

		sqlStatement := fmt.Sprintf(
			"SELECT t2.email_address AS email, concat(t2.first_name, ' ', t2.last_name) AS name, t2.id AS id " +
				"FROM (SELECT DISTINCT doctor_id from relations.patient_doctor WHERE patient_id=%d) t1, users.doctor t2 " +
				"WHERE t1.doctor_id=t2.id",session.Values["id"])

		rows, err := env.DB.Query(sqlStatement)
		if err != nil {
			env.LOG.Error("Get Permitted Docs List")
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
			return
		}
		defer rows.Close()

		var id int
		var email, name string
		var docsList []singleDoc

		for rows.Next() {
			err := rows.Scan(&email, &name, &id)
			if err != nil {
				env.LOG.Error("Get Permitted Docs List")
				json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
				return
			}
			docsList = append(docsList, singleDoc{Id: id, Name: name, Email: email})
		}
		if err := rows.Err(); err != nil {
			env.LOG.Error("Get Permitted Docs List")
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error, Try Again"})
			return
		}
		env.LOG.Info("Get Permitted Docs List")
		json.NewEncoder(w).Encode(out{Success:true, Message:docsList})

	}

}
