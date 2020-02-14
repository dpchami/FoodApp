import { clearUserDetail } from "../store/local";

export const loginUser = (username, password) => ({
    type: 'LOGIN_USER',
    payload: {
        username: username,
        password: password
    }
});

export const registerUser = (state) => ({
    type: 'REGISTER_USER',
    payload: {
        name: state.name,
        mobile: state.mobile,
        email: state.email,
        password: state.password,
        region: state.region,
        district: state.district,
        location: state.location
    }
});

export const logoutUser = () => {
    //type:'LOGOUT_USER'
    clearUserDetail();
    
};