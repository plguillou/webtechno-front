import axios from "axios";
import {
    GET_USER_INFO_URL,
    MODIFY_USER_INFO_URL
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
    axios.post(MODIFY_USER_INFO_URL, data).then(r => {
        update?.();
    })
};
