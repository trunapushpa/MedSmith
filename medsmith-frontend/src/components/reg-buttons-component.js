import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../css/App.css'

class RegButtonsComponent extends Component {
    render() {
        return (
            <div className={"container App col-lg-7"}>
                <div className={"jumbotron"}>
                    <Link to="/patient_register">
                        <button className={"btn btn-primary btn-lg"}>Patient Registration</button>
                    </Link>
                    <br/><br/>
                    <Link to="/doctor_register">
                        <button className={"btn btn-primary btn-lg"}>Doctor Registration</button>
                    </Link>
                    <br/><br/>
                    <Link to="/hospital_register">
                        <button className={"btn btn-primary btn-lg"}>Hospital Registration</button>
                    </Link>
                    <br/><br/>
                </div>
            </div>
        );
    }
}

export default RegButtonsComponent;
