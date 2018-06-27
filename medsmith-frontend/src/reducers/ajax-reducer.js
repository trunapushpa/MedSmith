const defaultState = {
    isLoading: false
};

export const ajaxReducer = (state = defaultState, action) => {
    if (action.type === 'START_AJAX_LOADING') {
        return {
            isLoading: true
        }
    }
    else if (action.type === 'STOP_AJAX_LOADING') {
        return {
            isLoading: false
        }
    }
    return state;
};