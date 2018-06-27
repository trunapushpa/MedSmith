const defaultState = {
    isRegSuccess: false
};

const isRegSuccess = (state = defaultState, action) => {
    if (action.type === 'REG_SUCCESS') {
        return {
            isRegSuccess: true
        }
    }
    else if (action.type === 'REG_SUCCESS_DONE') {
        return {
            isRegSuccess: false
        }
    }
    return state;
};

export default isRegSuccess;