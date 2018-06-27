package relations

import (
	"net/http"
	"encoding/json"
	"medsmith-backend/web-server/common"
	"medsmith-backend/web-server/users"
	"fmt"
)

func RemoveHospital(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := users.Store.Get(r, "session")

		// Check if user is authenticated && user is patient
		if auth, ok := session.Values["authenticated"].(bool); !ok || !auth || (session.Values["type"] != "patient") {
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Not authorised"})
			env.LOG.Info("Not authorised")
			return
		}

		hospitalId := r.FormValue("id")

		sqlStatement := fmt.Sprintf("DELETE FROM relations.patient_hospital WHERE patient_id = %d AND hospital_id = %s", session.Values["id"], hospitalId)

		_, err := env.DB.Exec(sqlStatement)

		if err != nil {
			env.LOG.Error(fmt.Sprint(err))
			json.NewEncoder(w).Encode(users.Out{Success: false, Message: "Internal Server Error"})
		}

		env.LOG.Info("Perms hos removed")
		json.NewEncoder(w).Encode(users.Out{Success: true, Message: "Hospital Removed Successfully"})

	}

}
