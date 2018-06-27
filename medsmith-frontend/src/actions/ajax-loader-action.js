export const ajaxStartLoading = () => {
    console.log('Start Loading Called');
    return {
        type: 'START_AJAX_LOADING'
    }
};

export const ajaxStopLoading = () => {
    console.log('Stop Loading Called');
    return {
        type: 'STOP_AJAX_LOADING'
    }
};