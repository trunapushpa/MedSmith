import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import LoginRegContainer from './login-reg-container'
import PatientProtectedContainer from './patient-protected-container'
import {getAuth} from '../actions/index'
import {withRouter} from 'react-router-dom'
import Doctor from './doctor-protected-container'

class AppContainer extends Component {

    componentDidMount() {
        this.props.getAuth()
    }

    render() {
        if (this.props.ajaxState.isLoading || !this.props.isReady.isReady) {
            console.log("isLoading = true");
            return <div className="loader"/>
        }
        else {
            console.log("isLoading = false");
            if (this.props.auth.isLoggedIn) {
                if (this.props.auth.type === 'patient') {
                    return <PatientProtectedContainer/>
                }
                else if (this.props.auth.type === 'doctor' || this.props.auth.type === 'hospital') {
                    return <Doctor/>
                }
                return null
            }
            return <LoginRegContainer/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isReady: state.isReady,
        ajaxState: state.ajaxReducer
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAuth: getAuth
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AppContainer))