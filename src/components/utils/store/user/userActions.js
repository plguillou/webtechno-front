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
                console.log(response.data)
                const token = response.data.token;
                axios.defaults.headers.common['Authorization'] = `${token}`;
                localStorage.setItem('authJwtToken', token);
                dispatch(setUser({...response.data.user, isLogged: true}));
            }
        )

    }
}

//todo logout
