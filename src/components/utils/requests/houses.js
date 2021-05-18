import axios from "axios";
import {ADD_USER_HOUSE_URL, GET_USER_HOUSES_URL} from "../Urls";

export const getHouses = (setter) => {
    axios.get(GET_USER_HOUSES_URL).then(r => {
        setter(r.data);
    })
};


export const addHouse = (title, description, update = null) => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    axios.post(ADD_USER_HOUSE_URL, data).then(r => {
        console.log(r.data);
        update?.();
    })
};
