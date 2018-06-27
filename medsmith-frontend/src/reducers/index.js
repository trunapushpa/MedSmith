import {combineReducers} from 'redux'
import AuthReducer from './auth-reducer'
import isReadyReducer from "./is-ready-reducer";
import isRegSuccess from './is-reg-success-reducer';
import {reducer as formReducer} from 'redux-form';
import {reducer as notifReducer} from 'redux-notifications';
import {ajaxReducer} from './ajax-reducer'
import getAllDocs from './get-all-docs'
import grantDocReducer from './grant-doc-reducer'
import getAllHos from './get-all-hos'
import grantHosReducer from './grant-hos-reducer'
import getGrantedDocsReducer from './get-granted-docs'
import getGrantedHosReducer from './get-granted-hos'

const allReducers = combineReducers({
    form: formReducer,
    notifs: notifReducer,
    auth: AuthReducer,
    isReady: isReadyReducer,
    isRegSuccess: isRegSuccess,
    ajaxReducer: ajaxReducer,
    getAllDocs: getAllDocs,
    grantDocReducer: grantDocReducer,
    getAllHos: getAllHos,
    grantHosReducer: grantHosReducer,
    getGrantedDocsReducer: getGrantedDocsReducer,
    getGrantedHosReducer: getGrantedHosReducer
});

export default allReducers;