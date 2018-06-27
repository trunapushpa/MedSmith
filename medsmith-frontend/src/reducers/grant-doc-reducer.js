const defaultState = {
    grantDocLoading: false,
    grantDocSuccessMsg: false,
};

const grantDocReducer = (state = defaultState, action) => {
    if (action.type === 'GRANT_DOC_START') {
        return {
            grantDocLoading: true,
            grantDocSuccessMsg: false,
        }
    }
    if (action.type === 'GRANT_DOC_SUCCESS') {
        return {
            grantDocLoading: false,
            grantDocSuccessMsg: true,
        }
    }
    if (action.type === 'GET_ALL_DOCS_START'){
        return{
            // grantDocLoading: false,
            grantDocSuccessMsg: false,
        }
    }
    return state;
};

export default grantDocReducer;