import axios from "axios";
import {GET_ALL_USERS, DELETE_USER_BY_ID} from "../Urls";


export const getAllUsers = (setter) => {
    axios.get(GET_ALL_USERS).then(r => {
        setter(r.data);
    })
};

export const deleteUserById = (userId,setter) => {
    axios.post(DELETE_USER_BY_ID + "/" +  userId.toString()).then(r => {
        setter(r.data);
    })
};

