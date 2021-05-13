import {LOGIN_USER_ATTEMPT_ACTION, SET_USER_ACTION} from "./UserReducer";
import {HOME_URL, LOGIN_URL} from "../../Urls";
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
                axios.defaults.headers.common['Authorization'] = `${response.data}`;
                localStorage.setItem('authJwtToken', response.data);
            }
        )

    }

}
