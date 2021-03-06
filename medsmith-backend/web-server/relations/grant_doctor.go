package relations

import (
	"net/http"
	"encoding/json"
	"medsmith-backend/web-server/common"
	"medsmith-backend/web-server/users"
	"fmt"
)

func GrantDoc(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := users.Store.Get(r, "session")

		// Check if user is authenticated && user is patient
		if auth, ok := session.Values["authenticated"].(bool); !ok || !auth || (session.Values["type"] != "patient"){
			json.NewEncoder(w).Encode(users.Out{Success:false, Message:"Not authorised"})
			env.LOG.Info("Not authorised")
			return
		}

		sqlStatement := fmt.Sprintf("INSERT INTO relations.patient_doctor(patient_id, doctor_id) VALUES (%d,%s)",session.Values["id"], r.FormValue("id"))

		_,err := env.DB.Exec(sqlStatement)

		if err != nil {
			json.NewEncoder(w).Encode(users.Out{Success:false, Message:"Internal Server Error"})
			env.LOG.Error("INSERT INTO relations.patient_doctor")
			return
		}
		env.LOG.Info("INSERT INTO relations.patient_doctor")
		json.NewEncoder(w).Encode(users.Out{Success:true, Message:"Doctor Granted Access"})
	}

}
