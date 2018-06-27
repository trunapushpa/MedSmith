const defaultState = {
    grantHosLoading: false,
    grantHosSuccessMsg: false,
};

const grantHosReducer = (state = defaultState, action) => {
    if (action.type === 'GRANT_HOS_START') {
        return {
            grantHosLoading: true,
            grantHosSuccessMsg: false,
        }
    }
    if (action.type === 'GRANT_HOS_SUCCESS') {
        return {
            grantHosLoading: false,
            grantHosSuccessMsg: true,
        }
    }
    if (action.type === 'GET_ALL_HOS_START'){
        return{
            // grantDocLoading: false,
            grantHosSuccessMsg: false,
        }
    }
    return state;
};

export default grantHosReducer;