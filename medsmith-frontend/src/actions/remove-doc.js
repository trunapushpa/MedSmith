import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
import {getGrantedDocsClick, getGrantedDocsStart} from "./get-granted-docs";
const {notifSend} = notifActions;

export const removeDoc = (doc_id) => {
    return (dispatch) => {
        // console.log('[Get] Granted Docs');
        dispatch(getGrantedDocsStart());
        let bodyFormData = new FormData();
        bodyFormData.set('id', (doc_id).toString());
        return axios.post(api_server_address+"/remove_doctor", bodyFormData, {withCredentials: true}).then((response) => {
            if (response.data.success) {
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