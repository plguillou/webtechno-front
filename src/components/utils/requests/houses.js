import axios from "axios";
import {
    ADD_USER_HOUSE_URL,
    GET_USER_HOUSE_DETAILS_URL_GET,
    GET_USER_HOUSES_URL,
    GET_ALL_HOUSES,
} from "../Urls";


export const getAllHouses = (setter) => {
    axios.get(GET_ALL_HOUSES).then(r => {
        setter(r.data);
    })
};

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

export const modifyHouseDetails = (houseId, newHouse, update = null) => {
    const data = new FormData();
    data.set("title", newHouse?.title);
    data.set("description", newHouse?.description);
    data.set("services", JSON.stringify(newHouse?.services));
    data.set("constraints", JSON.stringify(newHouse?.constraints));
    data.set("city", newHouse?.city);
    data.set("country", newHouse?.country);
    if(newHouse?.postalCode) data.set("postalCode", newHouse?.postalCode);
    data.set("address", newHouse?.address);
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
