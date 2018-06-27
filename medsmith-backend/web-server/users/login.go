package users

import (
	"net/http"
	"fmt"
	"database/sql"
	"encoding/base64"
	"crypto/sha1"
	"encoding/json"
	"medsmith-backend/web-server/common"
)

func PatientLoginHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, "patient", *env)
	}
}

func DoctorLoginHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, "doctor", *env)
	}
}

func HospitalLoginHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, "hospital", *env)
	}
}

func AdminLoginHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, "admin", *env)
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request, table string, env common.Env) {
	emailId := r.FormValue("email")
	phone := r.FormValue("phone")
	pwd := r.FormValue("pwd")
	session, _ := Store.Get(r, "session")

	var dbQuery, password,name,email string
	var id int

	if emailId != "" {
		if table == "patient" {
			dbQuery = fmt.Sprintf("SELECT id, password, email_address, concat(first_name, ' ', last_name) AS name FROM users.%s WHERE email_address='%s'", table, emailId)
		} else {
			dbQuery = fmt.Sprintf("SELECT id, password, email_address, concat(first_name, ' ', last_name) AS name FROM users.%s WHERE email_address='%s' AND verified=true", table, emailId)
		}
	} else if phone != "" {
		dbQuery = fmt.Sprintf("SELECT id, password FROM users.%s WHERE phone_number='%s'", table, phone)
	} else {
		json.NewEncoder(w).Encode(Out{false, "Provide Email"})
		env.LOG.Info("Login Failed")
		return
	}

	err := env.DB.QueryRow(dbQuery).Scan(&id, &password, &email, &name)

	switch {
	case err == sql.ErrNoRows:
		env.LOG.Info(fmt.Sprintf("No %s with such email.", table))
		if table == "patient" {
			json.NewEncoder(w).Encode(Out{false, fmt.Sprintf("No %s with such email.", table)})
		} else {
			json.NewEncoder(w).Encode(Out{false, fmt.Sprintf("You are not a verified %s.", table)})
		}
		return
	case err != nil:
		env.LOG.Error("Login Error")
	default:
		hasher := sha1.New()
		hasher.Write([]byte(pwd))
		sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
		if sha == password {
			session.Values["authenticated"] = true
			session.Values["type"] = table
			session.Values["id"] = id
			session.Save(r, w)
			json.NewEncoder(w).Encode(out{true, userDetails{id,email,name,table}})
			env.LOG.Info(fmt.Sprintf("%s Logged in.", table))
			return
		} else {
			json.NewEncoder(w).Encode(Out{false, "Password Incorrect"})
			env.LOG.Info(fmt.Sprintf("%s Login Failed.", table))
			return
		}
	}
	json.NewEncoder(w).Encode(Out{false, "Login Failed"})
	env.LOG.Info("User Login Failed.")
}
