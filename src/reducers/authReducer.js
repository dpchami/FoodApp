const initialState = {
    loginError: null,
    loginLoading: false,
    loginSuccess: null,
    registerError: null,
    registerLoading: false,
    registerSuccess: null,
}

export default ( state = initialState, {type, payload } ) => {
    switch(type) {
        case 'LOGIN_REQUEST_LOADING': 
            return {
                ...state,
                loginError: null,
                loginLoading: true,
                loginSuccess: null,
            };
        case 'LOGIN_REQUEST_ERROR': 
            return {
                ...state,
                loginError: payload,
                loginLoading: false,
                loginSuccess:null
            };
        case 'LOGIN_REQUEST_SUCCESS':
            return {
                ...state,
                loginError: null,
                loginLoading: false,
                loginSuccess: payload
            };
        case 'REGISTER_REQUEST_ERROR':
            return {
                ...state,
                registerError: payload,
                registerLoading: false,
                registerSuccess: null,
            };
        case 'REGISTER_REQUEST_LOADING':
            return {
                ...state,
                registerError: null,
                registerLoading: true,
                registerSuccess: null,
            };
        case 'REGISTER_REQUEST_SUCCESS':
            return {
                ...state,
                registerError: null,
                registerLoading: false,
                registerSuccess: payload,
            };
        default: 
        return state;
    }
}