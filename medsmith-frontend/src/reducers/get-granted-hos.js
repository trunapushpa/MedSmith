const defaultState = {
    grantedHos: [],
    grantedHosLoading: false
};

const getGrantedHosReducer = (state = defaultState, action) => {
    if (action.type === 'GET_GRANTED_HOS_START') {
        return {
            grantedHosLoading: true,
            grantedHos: []
        }
    }
    if (action.type === 'GET_GRANTED_HOS_SUCCESS') {
        if (action.payload == null){
            return {
                grantedHosLoading: false,
                grantedHos: []
            }
        }
        return {
            grantedHosLoading: false,
            grantedHos: action.payload
        }
    }
    return state;
};

export default getGrantedHosReducer;