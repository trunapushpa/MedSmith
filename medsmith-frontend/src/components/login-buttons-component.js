import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../css/App.css'

class LoginButtonsComponent extends Component {
    render() {
        return (
            <div className={"container App col-lg-7"}>
                <div className={"jumbotron"}>
                    <Link to="/patient_login">
                        <button className={"btn btn-primary btn-lg"}>Patient Login</button>
                    </Link>
                    <br/><br/>
                    <Link to="/doctor_login">
                        <button className={"btn btn-primary btn-lg"}>Doctor Login</button>
                    </Link>
                    <br/><br/>
                    <Link to="/hospital_login">
                        <button className={"btn btn-primary btn-lg"}>Hospital Login</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginButtonsComponent;
