import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
const {notifSend} = notifActions;

export const getGrantedDocsClick = () => {
    return (dispatch) => {
        console.log('[Get] Granted Docs');
        dispatch(getGrantedDocsStart());
        return axios.post(api_server_address+"/get_doctors", null, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(gotGrantedDocs(response.data.message));
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

export const gotGrantedDocs = (allDocs) => {
    return {
        type: 'GET_GRANTED_DOCS_SUCCESS',
        payload: allDocs
    }
};

export const getGrantedDocsStart = () => {
    return {
        type: 'GET_GRANTED_DOCS_START'
    }
};