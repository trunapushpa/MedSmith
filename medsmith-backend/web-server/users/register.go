package users

import (
	"net/http"
	"fmt"
	"encoding/base64"
	"crypto/sha1"
	"medsmith-backend/web-server/common"
	"encoding/json"
	"mime/multipart"
	"io/ioutil"
	"log"
	"os"
)

func PatientRegHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		regHandler(w, r, "patient", *env)
	}
}

func DoctorRegHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		regHandler(w, r, "doctor", *env)
	}
}

func HospitalRegHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		regHandler(w, r, "hospital", *env)
	}
}

func AdminRegHandler(env *common.Env) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		regHandler(w, r, "admin", *env)
	}
}

func regHandler(w http.ResponseWriter, r *http.Request, table string, env common.Env) {
	email := r.FormValue("email")
	name := r.FormValue("name")
	address := r.FormValue("address")
	gender := r.FormValue("gender")
	mPhone := r.FormValue("manager_phone")
	mName := r.FormValue("manager_name")
	fname := r.FormValue("fname")
	lname := r.FormValue("lname")
	pwd := r.FormValue("pwd")
	region := r.FormValue("region")
	regNo := r.FormValue("reg_no")
	allowRD := r.FormValue("allow_rd")
	dob := r.FormValue("dob")
	surgicalHistory := r.FormValue("surgical_history")
	medAllergies := r.FormValue("med_allergies")
	familyHistory := r.FormValue("family_history")
	habits := r.FormValue("habits")
	if allowRD == ""{
		allowRD = "false"
	}
	hasher := sha1.New()
	hasher.Write([]byte(pwd))
	sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

	var sqlStatement string
	var id int

	if table == "patient" {
		sqlStatement = fmt.Sprintf("INSERT INTO users.%s(first_name, last_name, password, email_address, gender, region, allow_rd, dob, surgical_history, med_allergies, family_history, habits) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s') RETURNING id", table, fname, lname, sha, email, gender, region,allowRD, dob, surgicalHistory, medAllergies, familyHistory, habits)
	} else if table == "doctor" {
		sqlStatement = fmt.Sprintf("INSERT INTO users.%s(first_name, last_name, password, email_address, gender, region, registration_number) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s') RETURNING id", table, fname, lname, sha, email, gender, region, regNo)
	} else if table == "hospital" {
		sqlStatement = fmt.Sprintf("INSERT INTO users.hospital(name, address, password, email_address, region, manager_name, manager_phone) VALUES ('%s','%s','%s','%s','%s','%s','%s') RETURNING id", name, address, pwd, email, region, mName, mPhone)
	}

	err := env.DB.QueryRow(sqlStatement).Scan(&id)

	if err != nil {
		env.LOG.Info(fmt.Sprint(err))
		json.NewEncoder(w).Encode(Out{false, fmt.Sprint(err)})
		return
	}

	if table == "doctor" {
		file, handle, err := r.FormFile("file")
		if err != nil {
			fmt.Fprintf(w, "%v", err)
			return
		}
		defer file.Close()

		mimeType := handle.Header.Get("Content-Type")
		switch mimeType {
		case "image/jpeg":
			saveFile(w, file, id, "jpeg")
		case "image/png":
			saveFile(w, file, id, "png")
		case "application/pdf":
			saveFile(w, file, id, "pdf")
		default:
			json.NewEncoder(w).Encode(Out{false, "Wrong file format"})
			return
		}
	}

	env.LOG.Info(fmt.Sprintf("%s Registered", table))
	json.NewEncoder(w).Encode(Out{true, "Registration Successful"})
}

func saveFile(w http.ResponseWriter, file multipart.File, id int, typeS string) {
	data, err := ioutil.ReadAll(file)
	if err != nil {
		log.Print(err)
		//json.NewEncoder(w).Encode(Out{false, "File upload error: 1"})
		return
	}

	d, err := os.Getwd()

	os.MkdirAll(d+"/files/docVerification", os.ModePerm)

	err = ioutil.WriteFile(fmt.Sprintf(d+"/files/docVerification/%d.%s", id, typeS), data, 0666)
	if err != nil {
		log.Print(err)
		//json.NewEncoder(w).Encode(Out{false, "File upload error: 1"})
		return
	}
}
