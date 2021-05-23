import {SET_HOUSE_CONSTRAINTS_ACTION} from "./houseConstraintReducer";
import axios from "axios";
import {GET_HOUSE_CONSTRAINT_URL} from "../../Urls";

export const setAllHouseConstraints = (houseConstraints) => ({
    type: SET_HOUSE_CONSTRAINTS_ACTION,
    payload:houseConstraints
})

export const getAllHouseConstraints = () => {
    return dispatch => {
        axios.get(GET_HOUSE_CONSTRAINT_URL).then(r => {
            // console.log(r.data)
            dispatch(setAllHouseConstraints(r.data))
        })
    }
}