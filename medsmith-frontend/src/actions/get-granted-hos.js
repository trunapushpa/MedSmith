import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
const {notifSend} = notifActions;

export const getGrantedHosClick = () => {
    return (dispatch) => {
        console.log('[Get] Granted Hos');
        dispatch(getGrantedHosStart());
        return axios.post(api_server_address+"/get_hospitals", null, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(gotGrantedHos(response.data.message));
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

export const gotGrantedHos = (allHos) => {
    return {
        type: 'GET_GRANTED_HOS_SUCCESS',
        payload: allHos
    }
};

export const getGrantedHosStart= () => {
    return {
        type: 'GET_GRANTED_HOS_START'
    }
};