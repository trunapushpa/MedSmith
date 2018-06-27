const defaultState = {
    allDocs: []
};

const getAllDocsReducer = (state = defaultState, action) => {
    if (action.type === 'GET_ALL_DOCS_START') {
        return {
            allDocsLoading: true,
            allDocs: []
        }
    }
    if (action.type === 'GET_ALL_DOCS_SUCCESS') {
        if (action.payload == null){
            return {
                allDocsLoading: false,
                allDocs: []
            }
        }
        return {
            allDocsLoading: false,
            allDocs: action.payload
        }
    }
    return state;
};

export default getAllDocsReducer;