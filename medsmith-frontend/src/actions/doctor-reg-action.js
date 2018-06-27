import axios from 'axios';
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {ajaxStartLoading, ajaxStopLoading} from "./ajax-loader-action";
import {regSuccess} from "./patient-reg-action";

const {notifSend} = notifActions;

export const doctorRegClick = (values) => {
    return (dispatch) => {
        dispatch(ajaxStartLoading());
        let bodyFormData = new FormData();
        bodyFormData.set('email', (values.email).toString());
        bodyFormData.set('gender', (values.gender).toString());
        bodyFormData.set('pwd', (values.pwd).toString());
        bodyFormData.set('fname', (values.fname).toString());
        bodyFormData.set('lname', (values.lname).toString());
        bodyFormData.set('region', (values.region).toString());
        bodyFormData.set('reg_no', (values.reg_no).toString());
        bodyFormData.set('file', values.file);
        return axios.post(api_server_address+"/doctor_register", bodyFormData, {
            withCredentials: true
        }).then((response) => {
            if (response.data.success) {
                dispatch(regSuccess());
                dispatch(notifSend({
                    message: 'You can login after verification. It could take around 24 hours.',
                    kind: 'info',
                    dismissAfter: 6000
                }));
                dispatch(notifSend({
                    message: 'Registration Successful.',
                    kind: 'success',
                    dismissAfter: 2000
                }));
            }
            else {
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