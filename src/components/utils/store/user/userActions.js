import {
    GET_USER_INFO_ACTION,
    LOG_SUCCESS,
    LOGIN_USER_ATTEMPT_ACTION,
    LOGOUT_USER_ACTION,
    SET_USER_ACTION
} from "./userReducer";
import {GET_USER_INFO_URL, LOGIN_URL} from "../../Urls";
import axios from "axios";

export const setUser = (user) => ({
    type: SET_USER_ACTION,
    payload: {user}
});

export const loginAttempt = (username, password) => {
    const data = new FormData();
    data.set("username", username);
    data.set("password", password);

    return dispatch => {
        dispatch({
            type: LOGIN_USER_ATTEMPT_ACTION
        });

        axios.post(LOGIN_URL, data).then(
            response => {
                const token = response.data.token;
                axios.defaults.headers.common['Authorization'] = `${token}`;
                localStorage.setItem('authJwtToken', token);
                dispatch(setUser({...response.data.user, isLogged: true}));
            }
        )
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: LOGOUT_USER_ACTION
    };
}

export const logSuccess = () => ({
    type: LOG_SUCCESS
});


export const getUserInfos = (token) => {

    return dispatch => {
        dispatch({
            type: GET_USER_INFO_ACTION
        });

        axios.get(GET_USER_INFO_URL).then(
            response => {
                const user = response.data;
                dispatch(setUser({...user}));
                dispatch(logSuccess());
            }
        )
    }
}