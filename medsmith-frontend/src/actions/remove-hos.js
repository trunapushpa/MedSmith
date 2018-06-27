import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {getGrantedHosClick, getGrantedHosStart} from "./get-granted-hos";
const {notifSend} = notifActions;

export const removeHos = (hos_id) => {
    return (dispatch) => {
        dispatch(getGrantedHosStart());
        let bodyFormData = new FormData();
        bodyFormData.set('id', (hos_id).toString());
        return axios.post(api_server_address+"/remove_hospital", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
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