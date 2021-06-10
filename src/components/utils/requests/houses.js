import axios from "axios";
import {
    ADD_USER_HOUSE_URL,
    MODIFY_USER_HOUSE_DETAILS_URL,
    GET_USER_HOUSES_URL, ADD_OR_EDIT_HOUSE_PICTURE_URL, HOUSE_PICTURE_URL, GET_ALL_HOUSES,
    DELETE_HOUSE_BY_ID,
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
    axios.get(MODIFY_USER_HOUSE_DETAILS_URL + "/" + houseId).then(r => {
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
    if (newHouse?.postalCode) data.set("postalCode", newHouse?.postalCode);
    data.set("address", newHouse?.address);
    axios.post(MODIFY_USER_HOUSE_DETAILS_URL + "/" + houseId, data).then(r => {
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

export const deleteHouseById = async (id) => {
    return (await axios.delete(DELETE_HOUSE_BY_ID + "/" + id)).data;

}

export const addOrEditPicture = (index = null, url, picture, houseId, update = null) => {
    // console.log("request param p", picture)
    // console.log("request param i", index, (index && index >= 0))


    if ((picture === undefined || picture === null) && (url === undefined || url === null)) return;

    const data = new FormData();
    if (picture) data.set("picture", picture);
    if (index!=null && index >= 0) data.set("index", index);
    if (url && !picture) data.set("url", url);
    // console.log(data)
    axios.post(ADD_OR_EDIT_HOUSE_PICTURE_URL + "/" + houseId, data).then(r => {
        // console.log(r)
        update?.();
    })
};

export const deletePicture = (pictureId, update = null) => {
    axios.delete(HOUSE_PICTURE_URL + "/" + pictureId).then(r => {
        // console.log(r)
        update?.();
    })
};
