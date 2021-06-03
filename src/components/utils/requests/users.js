import axios from "axios";
import {GET_ALL_USERS, DELETE_USER_BY_ID} from "../Urls";


export const getAllUsers = (setter) => {
    axios.get(GET_ALL_USERS).then(r => {
        setter(r.data);
    })
};

export const deleteUserById = async (id) => {
    return (await axios.delete(DELETE_USER_BY_ID + "/" + id)).data;
};

