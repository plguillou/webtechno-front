import axios from "axios";
import {GET_ALL_USERS} from "../Urls";


export const getAllUsers = (setter) => {
    axios.get(GET_ALL_USERS).then(r => {
        setter(r.data);
    })
};