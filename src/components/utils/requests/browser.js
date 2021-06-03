import axios from "axios";
import {BROWSE_HOUSES_URL} from "../Urls";

export const searchHouses = (setter, location, arrivalDate, departureDate) => {
    const data = new FormData();
    data.set("location", location);
    data.set("arrival", arrivalDate);
    data.set("departure", departureDate);
    console.log(location, arrivalDate, departureDate)
    axios.post(BROWSE_HOUSES_URL, data).then(r => {
        console.log(r)
        setter(r.data)
    });
}