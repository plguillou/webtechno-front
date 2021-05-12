import {SET_USER_ACTION} from "./UserReducer";

export const setUser = (user) => ({
    type: SET_USER_ACTION,
    payload: {user}
})
