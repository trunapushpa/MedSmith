import axios from 'axios';
import {loginSuccess} from "./login-action";
import {api_server_address} from "../api-server";

export const getAuth = () => {
    return (dispatch) => {
        console.log('Getting Authentication');
        return axios.get(api_server_address + "/auth_check", {withCredentials: true}).then((response) => {
            console.log('Received Auth');
            if (response.data.success) {
                dispatch(loginSuccess(response.data.message));
            }
            dispatch(gotAuth());
        })
    }
};

export const gotAuth = () => {
    return {
        type: 'GOT_AUTH'
    }
};