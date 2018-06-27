import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../css/App.css'

class LoginRegButtonsComponent extends Component {
    render() {
        return (
            <div className={"container App col-lg-7"}>
                <div className={"container"}>
                    <div className="mycard" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        <div className="card bg-light border-0 mb-3" style={{marginRight: '40px',marginLeft: '40px', marginTop: '40px', marginBottom: '40px'}}>
                        <h3>Already have an account</h3><br/>
                        <Link to="/login">
                            <button className={"btn btn-primary btn-lg"}>Login</button>
                        </Link>
                        </div>
                        <div className="card bg-light border-0 mb-3" style={{marginRight: '40px',marginLeft: '40px', marginTop: '40px', marginBottom: '40px'}}>
                        <h3>Do not have an account</h3><br/>
                        <Link to="/register">
                            <button className={"btn btn-primary btn-lg"}>Register</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRegButtonsComponent;
