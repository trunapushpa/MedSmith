import {loginClickHospital, loginClickDoctor, loginClickPatient} from './login-action'
import {getAuth} from './auth-action'
import {logoutClick} from './logout-action'
import {patientRegClick, regSuccessDone} from './patient-reg-action'
import {doctorRegClick} from './doctor-reg-action'
import {ajaxStartLoading, ajaxStopLoading} from './ajax-loader-action'
import {hospitalRegClick} from './hospital-reg-action'
import {getAllDocsClick} from './get-all-docs'
import {grantDocClick} from './grant-doc'
import {getAllHosClick} from './get-all-hos'
import {grantHosClick} from './grant-hos'
import {getGrantedDocsClick} from './get-granted-docs'
import {removeDoc} from './remove-doc'
import {getGrantedHosClick} from './get-granted-hos'
import {removeHos} from './remove-hos'

export {
    loginClickHospital,
    loginClickDoctor,
    loginClickPatient,
    getAuth,
    logoutClick,
    patientRegClick,
    doctorRegClick,
    ajaxStartLoading,
    ajaxStopLoading,
    regSuccessDone,
    hospitalRegClick,
    getAllDocsClick,
    grantDocClick,
    getAllHosClick,
    grantHosClick,
    getGrantedDocsClick,
    removeDoc,
    getGrantedHosClick,
    removeHos
}
