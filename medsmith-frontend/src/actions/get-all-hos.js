import axios from 'axios'
import {actions as notifActions} from 'redux-notifications';
import {api_server_address} from "../api-server";
const {notifSend} = notifActions;

export const getAllHosClick = () => {
    return (dispatch) => {
        dispatch(getAllHosStart());
        return axios.post(api_server_address+"/get_all_hospitals", null, {withCredentials: true}).then((response) => {
            if (response.data.success) {
                dispatch(gotAllHos(response.data.message));
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

export const gotAllHos = (allHos) => {
    return {
        type: 'GET_ALL_HOS_SUCCESS',
        payload: allHos
    }
};

export const getAllHosStart = () => {
    return {
        type: 'GET_ALL_HOS_START'
    }
};