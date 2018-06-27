import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {ajaxStopLoading, ajaxStartLoading} from "./ajax-loader-action";
const {notifSend} = notifActions;

export const logoutClick = () => {
    return (dispatch) => {
        dispatch(ajaxStartLoading());
        console.log('Logout Clicked');
        return axios.post(api_server_address+"/logout", null, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                console.log('Logout Success');
                dispatch(notifSend({
                    message: 'Logout Success',
                    kind: 'info',
                    dismissAfter: 2000
                }));
                dispatch(logoutSuccess());
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

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS',
    }
};