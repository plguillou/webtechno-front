import axios from "axios";
import {BROWSE_HOUSES_URL} from "../Urls";

let location = "";
export const setLocation = (value) => {location = value};
let arrivalDate = "";
export const setArrivalDate = (value) => {arrivalDate = value};
let departureDate = "";
export const setDepartureDate = (value) => {departureDate = value};

export const searchHouses = (setter) => {
    const data = new FormData();
    data.set("location", location);
    data.set("arrival", arrivalDate);
    data.set("departure", departureDate);
    console.log(location, arrivalDate, departureDate)
    axios.post(BROWSE_HOUSES_URL, data).then(r => {
        setter(r.data)
    });
}