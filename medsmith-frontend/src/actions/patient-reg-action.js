import axios from 'axios';
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {ajaxStartLoading, ajaxStopLoading} from "./ajax-loader-action";

const {notifSend} = notifActions;

export const patientRegClick = (values) => {
    return (dispatch) => {
        dispatch(ajaxStartLoading());
        console.log('Reg Clicked');
        let bodyFormData = new FormData();
        bodyFormData.set('email', (values.email).toString());
        bodyFormData.set('pwd', (values.pwd).toString());
        bodyFormData.set('fname', (values.fname).toString());
        bodyFormData.set('lname', (values.lname).toString());
        bodyFormData.set('region', (values.region).toString());
        bodyFormData.set('gender', (values.gender).toString());
        bodyFormData.set('allow_rd', (values.allow_rd).toString());
        bodyFormData.set('dob', (values.dob).toString());
        bodyFormData.set('surgical_history', (values.surgical_history).toString());
        bodyFormData.set('med_allergies', (values.med_allergies).toString());
        bodyFormData.set('family_history', (values.family_history).toString());
        bodyFormData.set('habits', (values.habits).toString());
        console.log('Sending Registration');
        return axios.post(api_server_address+"/patient_register", bodyFormData, {
            withCredentials: true
        }).then((response) => {
            if (response.data.success) {
                dispatch(regSuccess());
                dispatch(notifSend({
                    message: 'Login to start using MedSmith.',
                    kind: 'info',
                    dismissAfter: 4000
                }));
                dispatch(notifSend({
                    message: 'Registration Successful.',
                    kind: 'success',
                    dismissAfter: 2000
                }));
            }
            else {
                console.log(response.data);
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'danger',
                    dismissAfter: 2000
                }));
            }
            dispatch(ajaxStopLoading());
        });
    }
};

export const regSuccess = () => {
    return {
        type: 'REG_SUCCESS',
        payload: {}
    }
};

export const regSuccessDone = () => {
    return {
        type: 'REG_SUCCESS_DONE',
        payload: {}
    }
};