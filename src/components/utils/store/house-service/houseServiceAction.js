import {SET_HOUSE_SERVICE_ACTION} from "./houseServiceReducer";
import axios from "axios";
import {GET_HOUSE_SERVICE_URL} from "../../Urls";

export const setAllHouseServices = (houseServices) => ({
    type: SET_HOUSE_SERVICE_ACTION,
    payload:houseServices
})

export const getAllHouseServices = () => {
    return dispatch => {
        axios.get(GET_HOUSE_SERVICE_URL).then(r => {
            dispatch(setAllHouseServices(r.data))
        })
    }
}