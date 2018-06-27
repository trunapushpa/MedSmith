package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	_ "github.com/lib/pq"
	"medsmith-backend/web-server/common"
	"medsmith-backend/web-server/users"
	"github.com/rs/cors"
	"fmt"
	"medsmith-backend/web-server/relations"
)

const port = 8080

func corsFunc(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		w.Header().Set("Content-Type", "application/json")
		//time.Sleep(2*time.Second)
		f(w, r)
	}
}

func main() {
	logger, err := common.NewLOG()
	if err != nil { panic(err) }
	defer logger.Sync()

	db, err := common.NewDB()
	if err != nil { panic(err) }
	defer db.Close()
	err = db.Ping()
	if err != nil { panic(err) }

	env := &common.Env{DB: db, LOG: logger}

	router := mux.NewRouter()
	if err != nil { panic(err) }

	//user module handlers
	router.HandleFunc("/patient_register", corsFunc(users.PatientRegHandler(env))).Methods("POST")
	router.HandleFunc("/doctor_register", corsFunc(users.DoctorRegHandler(env))).Methods("POST")
	router.HandleFunc("/hospital_register", corsFunc(users.HospitalRegHandler(env))).Methods("POST")
	router.HandleFunc("/admin_register", corsFunc(users.AdminRegHandler(env))).Methods("POST")
	router.HandleFunc("/patient_login", corsFunc(users.PatientLoginHandler(env))).Methods("POST")
	router.HandleFunc("/doctor_login", corsFunc(users.DoctorLoginHandler(env))).Methods("POST")
	router.HandleFunc("/hospital_login", corsFunc(users.HospitalLoginHandler(env))).Methods("POST")
	router.HandleFunc("/admin_login", corsFunc(users.AdminLoginHandler(env))).Methods("POST")
	router.HandleFunc("/logout", corsFunc(users.LogoutHandler(env)))
	router.HandleFunc("/auth_check", corsFunc(users.AuthCheck(env)))
	router.HandleFunc("/forgot_pass", corsFunc(users.ForgotPassword(env))).Methods("POST")
	router.HandleFunc("/reset_pass", corsFunc(users.ResetPassword(env))).Methods("POST")

	//relations module handlers
	router.HandleFunc("/get_all_doctors", corsFunc(relations.GetAllDocs(env))).Methods("POST")
	router.HandleFunc("/get_doctors", corsFunc(relations.GetDocs(env))).Methods("POST")
	router.HandleFunc("/grant_doctor", corsFunc(relations.GrantDoc(env))).Methods("POST")
	router.HandleFunc("/remove_doctor", corsFunc(relations.RemoveDoc(env))).Methods("POST")

	router.HandleFunc("/get_all_hospitals", corsFunc(relations.GetAllHos(env))).Methods("POST")
	router.HandleFunc("/get_hospitals", corsFunc(relations.GetHospitals(env))).Methods("POST")
	router.HandleFunc("/grant_hospital", corsFunc(relations.GrantHospital(env))).Methods("POST")
	router.HandleFunc("/remove_hospital", corsFunc(relations.RemoveHospital(env))).Methods("POST")

	env.LOG.Info(fmt.Sprint("Server Started at port: ", port))

	handler := cors.Default().Handler(router)
	if err := http.ListenAndServe(":"+strconv.Itoa(port), handler); err != nil {
		panic(err)
	}
}
