import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {getGrantedHosClick} from "./get-granted-hos";
const {notifSend} = notifActions;

export const grantHosClick = (values) => {
    return (dispatch) => {
        dispatch(grantHosStart());
        let bodyFormData = new FormData();
        bodyFormData.set('id', (values.id).toString());
        return axios.post(api_server_address+"/grant_hospital", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(grantHosSuccess());
                dispatch(notifSend({
                    message: response.data.message,
                    kind: 'success',
                    dismissAfter: 2000
                }));
                dispatch(getGrantedHosClick());
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

export const grantHosSuccess = () => {
    return {
        type: 'GRANT_HOS_SUCCESS',
    }
};

export const grantHosStart = () => {
    return {
        type: 'GRANT_HOS_START',
    }
};