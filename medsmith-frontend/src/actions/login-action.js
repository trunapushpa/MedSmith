import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {ajaxStopLoading, ajaxStartLoading} from "./ajax-loader-action";

const {notifSend} = notifActions;

export const loginClickPatient = (values) => {
    return (dispatch) => {
        dispatch(ajaxStartLoading());
        console.log('Login Clicked');
        let bodyFormData = new FormData();
        bodyFormData.set('email', (values.email).toString());
        bodyFormData.set('pwd', (values.pwd).toString());
        console.log('Sending Login');
        return axios.post(api_server_address + "/patient_login", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(notifSend({
                    message: 'Login Success',
                    kind: 'success',
                    dismissAfter: 2000
                }));
                console.log('Login Success');
                dispatch(loginSuccess(response.data.message));
            }
            else {
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'danger',
                    dismissAfter: 2000
                }));
            }
            console.log('dispatching stop');
            dispatch(ajaxStopLoading());
        })
    }
};

export const loginClickDoctor = (values) => {
    return (dispatch) => {
        dispatch(ajaxStartLoading());
        console.log('Login Clicked');
        let bodyFormData = new FormData();
        bodyFormData.set('email', (values.email).toString());
        bodyFormData.set('pwd', (values.pwd).toString());
        console.log('Sending Login');
        return axios.post(api_server_address + "/doctor_login", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(notifSend({
                    message: 'Login Success',
                    kind: 'success',
                    dismissAfter: 2000
                }));
                console.log('Login Success');
                dispatch(loginSuccess(response.data.message));
            }
            else {
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'danger',
                    dismissAfter: 2000
                }));
            }
            dispatch(ajaxStopLoading());
        })
    }
};

export const loginClickHospital = (values) => {
    return (dispatch) => {
        dispatch(ajaxStartLoading());
        console.log('Login Clicked');
        let bodyFormData = new FormData();
        bodyFormData.set('email', (values.email).toString());
        bodyFormData.set('pwd', (values.pwd).toString());
        console.log('Sending Login');
        return axios.post(api_server_address + "/hospital_login", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(notifSend({
                    message: 'Login Success',
                    kind: 'success',
                    dismissAfter: 2000
                }));
                console.log('Login Success');
                dispatch(loginSuccess(response.data.message));
            }
            else {
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'danger',
                    dismissAfter: 2000
                }));
            }
            dispatch(ajaxStopLoading());
        })
    }
};

export const loginSuccess = (payload) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: payload
    }
};