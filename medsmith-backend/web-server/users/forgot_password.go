package users

import (
	"fmt"
	"io/ioutil"
	"net/smtp"
	"net/http"
	"os"
	"strings"
	"medsmith-backend/web-server/common"
)

func ForgotPassword(env *common.Env) func(http.ResponseWriter, *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		body := `click on the link to reset password`
		// TODO: Create METABI gmail account
		from := "metabi@gmail.com"
		pass := ReadPass()
		to := r.FormValue("email")
		msg := "From: " + from + "\n" +
			"To: " + to + "\n" +
			"Subject: Hello there\n\n" +
			body

		err := smtp.SendMail("smtp.gmail.com:587",
			smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
			from, []string{to}, []byte(msg))

		if err != nil {
			env.LOG.Error(fmt.Sprint("smtp error:", err))
			return
		}
	}

}

func ReadPass() (string) {
	// password.txt should be in the same directory where build command is run.
	d, err := os.Getwd()
	b, err := ioutil.ReadFile(d + "/web-server/users/password.txt")
	if err != nil {
		fmt.Print(err)
	}
	str := string(b)
	str = strings.TrimSuffix(str, "\n")
	// fmt.Println(str) // print the content as a 'string'
	return str
}
