import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
const {notifSend} = notifActions;

export const getAllDocsClick = () => {
    return (dispatch) => {
        dispatch(getAllDocsStart());
        return axios.post(api_server_address+"/get_all_doctors", null, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(gotAllDocs(response.data.message));
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

export const gotAllDocs = (allDocs) => {
    return {
        type: 'GET_ALL_DOCS_SUCCESS',
        payload: allDocs
    }
};

export const getAllDocsStart = () => {
    return {
        type: 'GET_ALL_DOCS_START'
    }
};