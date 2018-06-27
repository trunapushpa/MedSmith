const defaultState = {
    allHos: []
};

const getAllHosReducer = (state = defaultState, action) => {
    if (action.type === 'GET_ALL_HOS_START') {
        return {
            allHosLoading: true,
            allHos: []
        }
    }
    if (action.type === 'GET_ALL_HOS_SUCCESS') {
        if (action.payload == null){
            return {
                allHosLoading: false,
                allHos: []
            }
        }
        return {
            allHosLoading: false,
            allHos: action.payload
        }
    }
    return state;
};

export default getAllHosReducer;