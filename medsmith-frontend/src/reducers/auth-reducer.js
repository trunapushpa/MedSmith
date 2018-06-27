const defaultState = {
    isLoggedIn: false,
    userId: null,
    email: null,
    type: null,
    name: null
};

const authReducer = (state = defaultState, action) => {
    if (action.type === 'LOGIN_SUCCESS') {
        return {
            isLoggedIn: true,
            id: action.payload.id,
            type: action.payload.type,
            name: action.payload.name,
            email: action.payload.email
        }
    }
    if (action.type === 'LOGOUT_SUCCESS') {
        return {
            defaultState
        }
    }
    return state;
};

export default authReducer;