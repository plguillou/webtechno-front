import axios from "axios";
import {BROWSE_HOUSES_URL} from "../Urls";

let location = "";
export const setLocation = (value) => {location = value};
let arrivalDate = "";
export const setArrivalDate = (value) => {arrivalDate = value};
let departureDate = "";
export const setDepartureDate = (value) => {departureDate = value};

export let alertMsg = "";
export let alertUser = false;

export const searchHouses = (setter) => {
    alertUser = false;
    const data = new FormData();
    data.set("location", location);
    data.set("arrival", arrivalDate);
    data.set("departure", departureDate);
    console.log(location, arrivalDate, departureDate)
    axios.post(BROWSE_HOUSES_URL, data).then(r => {
        setter(r.data)
    });
}

export const areFieldsComplete = () => {
    if (location !== "" && arrivalDate !== "" && departureDate !== "") {
        return true;
    } else {
        alertMsg = "Vous devez remplir les 3 champs de la barre de recherche pour avoir un résultat";
        alertUser = true;
        return false;
    }
}

export const checkDatesPattern = () => {
    const datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if (datePattern.test(arrivalDate) && datePattern.test(departureDate)) {
        return true;
    } else {
        alertMsg = "Les dates doivent être de la forme YYYY-MM-DD";
        alertUser = true;
        return false;
    }
}

const stringToDate = (strDate) => {
    let dateArray = strDate.split("-");
    let date = new Date();
    date.setFullYear(parseInt(dateArray[0], 10));
    date.setMonth(parseInt(dateArray[1], 10) - 1);
    date.setDate(parseInt(dateArray[2], 10));
    return date;
}

export const isArrivalFuture = () => {
    let aDate = stringToDate(arrivalDate);
    if (aDate > Date.now()) {
        return true;
    } else {
        alertMsg = "Vous ne pouvez pas arriver à une date passée";
        alertUser = true;
        return false;
    }
}

export const isArrivalBeforeDeparture = () => {
    let aDate = stringToDate(arrivalDate);
    let dDate = stringToDate(departureDate);
    if (aDate < dDate) {
        return true;
    } else {
        alertMsg = "La date d'arrivée doit être antérieure à la date de départ";
        alertUser = true;
        return false;
    }
}