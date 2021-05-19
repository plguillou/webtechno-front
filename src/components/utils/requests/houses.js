import axios from "axios";
import {
    ADD_USER_HOUSE_URL,
    GET_USER_HOUSE_DETAILS_URL_GET,
    GET_USER_HOUSES_URL
} from "../Urls";

export const getHouses = (setter) => {
    axios.get(GET_USER_HOUSES_URL).then(r => {
        setter(r.data);
    })
};

export const getHouseDetails = (houseId, setter) => {
    axios.get(GET_USER_HOUSE_DETAILS_URL_GET + "/" + houseId).then(r => {
        setter(r.data);
    })
};

export const modifyHouseDetails = (houseId, title, description, constraints= null, services = null, update = null) => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("services", services);
    data.set("constraints", JSON.stringify(constraints));
    axios.post(GET_USER_HOUSE_DETAILS_URL_GET + "/" + houseId, data).then(r => {
        update?.();
    })
};


export const addHouse = (title, description, update = null) => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    axios.post(ADD_USER_HOUSE_URL, data).then(r => {
        update?.();
    })
};
