import React, {Component} from 'react';
import HeaderComponent from "../components/header-component";
import {connect} from "react-redux";
import {
    loginClickPatient,
    loginClickDoctor,
    loginClickHospital,
    patientRegClick, doctorRegClick, regSuccessDone, hospitalRegClick
} from "../actions";
import {bindActionCreators} from "redux";
import {withRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import LoginRegButtons from '../components/login-reg-buttons-component'
// import LoginButtons from '../components/login-buttons-component'
import RegButtons from '../components/reg-buttons-component'
import LoginFormComponent from "../components/login-form-component";
import PatientRegForm from '../components/patient-reg-component';
import DoctorRegComponent from "../components/doctor-reg-component";
import HospitalRegComponent from "../components/hospital-reg-component";

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

class LoginRegContainer extends Component {

    submit = (values) => {
        if (values.userType === 'patient') {
            return this.props.loginClickPatient(values);
        }
        else if (values.userType === 'doctor') {
            return this.props.loginClickDoctor(values);
        }
        else if (values.userType === 'hospital') {
            return this.props.loginClickHospital(values);
        }
    };

    render() {
        return (
            <div>
                <Link to="/"><HeaderComponent/></Link>
                <br/><br/>
                <Switch>
                    <Route exact path="/" component={LoginRegButtons}/>
                    <Route path="/register" component={RegButtons}/>
                    <PropsRoute path="/login" component={LoginFormComponent} onSubmit={this.submit}
                                regSuccessDone={this.props.regSuccessDone}/>
                    <PropsRoute path="/patient_register" component={
                        this.props.isRegSuccess ? ((() => {
                            return <Redirect to="/login"/>
                        })) : (PatientRegForm)}
                                onSubmit={(values) => this.props.patientRegClick(values)}/>
                    <PropsRoute path="/doctor_register" component={
                        this.props.isRegSuccess ? ((() => {
                            return <Redirect to="/login"/>
                        })) : (DoctorRegComponent)}
                                onSubmit={(values) => this.props.doctorRegClick(values)}/>
                    <PropsRoute path="/hospital_register" component={
                        this.props.isRegSuccess ? ((() => {
                            return <Redirect to="/login"/>
                        })) : (HospitalRegComponent)}
                                onSubmit={(values) => this.props.hospitalRegClick(values)}/>
                    <Route render={() => (
                        <Redirect to="/"/>
                    )}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isRegSuccess: state.isRegSuccess.isRegSuccess,
        ajaxReducer: state.ajaxReducer
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginClickPatient: loginClickPatient,
        loginClickDoctor: loginClickDoctor,
        loginClickHospital: loginClickHospital,
        patientRegClick: patientRegClick,
        doctorRegClick: doctorRegClick,
        hospitalRegClick: hospitalRegClick,
        regSuccessDone: regSuccessDone
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(LoginRegContainer))