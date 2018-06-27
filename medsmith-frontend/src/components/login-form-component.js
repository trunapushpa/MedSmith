import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginFormComponent extends Component {
    componentDidMount() {
        this.props.regSuccessDone();
    }
    render() {
        return (
            <div className="container col-lg-7">
                <div className="jumbotron">
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    <small className="form-text text-muted" style={{textAlign: "center"}}>(We'll never share your details with anyone else.)</small>
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <Field name="email" className="form-control" component="input" type="email"
                                   placeholder="Enter email" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <Field name="pwd" className="form-control" component="input" type="password"
                                   placeholder="Password" required={true}/>
                        </div>
                        <div className="form-group">
                            <label>Login as:</label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <Field name="userType" type="radio" component="input" value="patient"/>&nbsp;
                                    Patient
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <Field name="userType" type="radio" component="input" value="doctor"/>&nbsp;
                                    Doctor
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <Field name="userType" type="radio" component="input" value="hospital"/>&nbsp;
                                    Hospital
                                </label>
                            </div>
                        </div>
                        <div className="form-group App">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

LoginFormComponent = reduxForm({
    form: 'login',
    initialValues: {
        userType: 'patient',
        email: '',
        pwd: ''
    }
})(LoginFormComponent);

export default LoginFormComponent;