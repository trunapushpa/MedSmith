const defaultState = {
    grantedDocs: [],
    grantedDocsLoading: false
};

const getGrantedDocsReducer = (state = defaultState, action) => {
    if (action.type === 'GET_GRANTED_DOCS_START') {
        return {
            grantedDocsLoading: true,
            grantedDocs: []
        }
    }
    if (action.type === 'GET_GRANTED_DOCS_SUCCESS') {
        if (action.payload == null){
            return {
                grantedDocsLoading: false,
                grantedDocs: []
            }
        }
        return {
            grantedDocsLoading: false,
            grantedDocs: action.payload
        }
    }
    return state;
};

export default getGrantedDocsReducer;