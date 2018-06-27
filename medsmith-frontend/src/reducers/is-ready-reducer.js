const defaultState = {
    isReady: false
};

const isReadyReducer = (state = defaultState, action) => {
    if (action.type === 'GOT_AUTH') {
        return {
            isReady: true
        }
    }
    return state;
};

export default isReadyReducer;