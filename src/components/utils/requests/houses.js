import axios from "axios";
import {GET_USER_HOUSES_URL, HOME_URL} from "../Urls";

export const getHouses = (setter) => {
    axios.get(GET_USER_HOUSES_URL).then(r => {
        setter(r.data);
    })
};


export const addHouse = (title, description, update = null) => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    axios.post(HOME_URL).then(r => {
        console.log(r.data);
        update?.();
    })
};
