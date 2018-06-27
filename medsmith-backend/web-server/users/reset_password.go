package users

import (
	"net/http"
	"medsmith-backend/web-server/common"
	"encoding/json"
	"fmt"
	"crypto/sha1"
	"encoding/base64"
)

func ResetPassword(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		cur_pass := r.FormValue("cur_pass")
		new_pass1 := r.FormValue("new_pass1")
		new_pass2 := r.FormValue("new_pass2")
		session, _ := Store.Get(r, "session")

		if new_pass1 != new_pass2 {
			json.NewEncoder(w).Encode(Out{false, fmt.Sprintf("New password not same")})
			return
		}
		var dbQuery, password string

		id := session.Values["id"]
		table := session.Values["type"]

		if cur_pass != "" {
			dbQuery = fmt.Sprintf("SELECT id, password FROM users.%s where id = %d", table, id)
		} else {
			json.NewEncoder(w).Encode(Out{false, fmt.Sprintf("enter current password")})
			return
		}

		err := env.DB.QueryRow(dbQuery).Scan(&id, &password)

		switch {
		case err != nil:
			env.LOG.Error("Reset Password")
		default:
			hasher := sha1.New()
			hasher.Write([]byte(cur_pass))
			sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

			if sha == password && session.Values["authenticated"] == true {

				hasher1 := sha1.New()
				hasher1.Write([]byte(new_pass1))
				new_sha1 := base64.URLEncoding.EncodeToString(hasher1.Sum(nil))

				// sqlStatement := `UPDATE users.$1 SET password = $2 where id = $3`
				// _, err := db.Exec(sqlStatement, table, new_sha1, id)
				// log.Println(table, id)

				dbQuery = fmt.Sprintf("UPDATE users.%s SET password = '%s' where id = %d", table, new_sha1, id)
				_, err := env.DB.Exec(dbQuery)

				if err != nil {
					env.LOG.Error("Update Password")
					json.NewEncoder(w).Encode(Out{false, "Internal error"})
					return
				}

				json.NewEncoder(w).Encode(Out{true, fmt.Sprintf("Password updated")})
				env.LOG.Info(fmt.Sprintf("Password changed for user %d", id))
				return
			} else {
				json.NewEncoder(w).Encode(Out{false, "Password Incorrect"})
				return
			}
		}
		json.NewEncoder(w).Encode(Out{false, "Password Reset Failed"})
		env.LOG.Info("Password Reset Failed")
	}

}
