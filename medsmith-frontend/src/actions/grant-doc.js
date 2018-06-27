import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {getGrantedDocsClick} from "./get-granted-docs";
const {notifSend} = notifActions;

export const grantDocClick = (values) => {
    return (dispatch) => {
        dispatch(grantDocStart());
        let bodyFormData = new FormData();
        bodyFormData.set('id', (values.id).toString());
        return axios.post(api_server_address+"/grant_doctor", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(grantDocSuccess());
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'success',
                    dismissAfter: 2000
                }));
                dispatch(getGrantedDocsClick());
            }
            else {
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'danger',
                    dismissAfter: 2000
                }));
            }
            // dispatch(ajaxStopLoading());
        })
    }
};

export const grantDocSuccess = () => {
    return {
        type: 'GRANT_DOC_SUCCESS',
    }
};

export const grantDocStart = () => {
    return {
        type: 'GRANT_DOC_START',
    }
};