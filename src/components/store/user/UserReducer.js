export const SET_USER_ACTION = "SET_USER_ACTION";
export const SET_USER_NAME_ACTION = "SET_USER_ACTION";

const defaultUser = {
    name: null,
    mail: null,
    role: null
}

export default function userReducer(state = defaultUser, action) {
    switch (action.type) {
        case SET_USER_ACTION:
            return action.payload.user;
        case SET_USER_NAME_ACTION:
            return { ...state, name: action.payload} ;
        default:
            return state;

    }
}