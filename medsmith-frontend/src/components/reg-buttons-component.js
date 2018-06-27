import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../css/App.css'

class RegButtonsComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="mycard" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <div className="card bg-light border-0 mb-3"
                         style={{marginLeft:'25px', marginRight:'25px', marginTop: '30px', marginBottom: '40px'}}>
                        <h4>Register as a Patient</h4><br/>
                        <Link to="/patient_register">
                            <button className={"btn btn-primary btn-lg"}>Patient Registration</button>
                        </Link>
                    </div>
                    <div className="card bg-light border-0 mb-3"
                         style={{marginLeft:'25px', marginRight:'25px', marginTop: '30px', marginBottom: '40px'}}>
                        <h4>Register as a Doctor</h4><br/>
                        <Link to="/doctor_register">
                            <button className={"btn btn-primary btn-lg"}>Doctor Registration</button>
                        </Link>
                    </div>
                    <div className="card bg-light border-0 mb-3"
                         style={{marginLeft:'25px', marginRight:'25px', marginTop: '30px', marginBottom: '40px'}}>
                        <h4>Register as a Hospital</h4><br/>
                        <Link to="/hospital_register">
                            <button className={"btn btn-primary btn-lg"}>Hospital Registration</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegButtonsComponent;
