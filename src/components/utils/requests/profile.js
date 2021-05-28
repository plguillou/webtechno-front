import axios from "axios";
import {
    GET_USER_HOUSE_DETAILS_URL_GET,
    GET_USER_HOUSES_URL, GET_USER_INFO_URL
} from "../Urls";


export const getProfileInfos = (setter) => {
    axios.get(GET_USER_INFO_URL).then(r => {
        setter(r.data);
    })
};

export const modifyProfileInfos = (newUser, update = null) => {
    const data = new FormData();
    data.set("name", newUser?.name);
    data.set("mail", newUser?.mail);
    axios.post(GET_USER_INFO_URL, data).then(r => {
        update?.();
    })
};
