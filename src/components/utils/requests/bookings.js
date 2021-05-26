import axios from "axios";
import {ADD_BOOKINGS_URL, GET_BOOKINGS_URL, GET_RECEIVED_BOOKINGS_URL, REMOVE_BOOKINGS_URL} from "../Urls";

export const getBookings = async () => {
    return (await axios.get(GET_BOOKINGS_URL)).data;
}

export const getReceivedBookings = async () => {
    return (await axios.get(GET_RECEIVED_BOOKINGS_URL)).data;
}

export const addNewBooking = async (startDate, endDate, houseId, offeredHouseId = null) => {
    const data = new FormData();
    data.set("startDate", startDate.toDateString());
    data.set("endDate", endDate.toDateString());
    data.set("houseId", houseId);
    if(offeredHouseId != null) data.set("offeredHouseId", offeredHouseId);

    return (await axios.post(ADD_BOOKINGS_URL, data)).data;
}

export const removeSentBooking = async (id) => {
    return (await axios.delete(REMOVE_BOOKINGS_URL + "/" + id)).data;
}
