import axios from "axios";
import {
    ACCEPT_BOOKING_URL,
    ADD_BOOKINGS_URL,
    CHANGE_RECEIVED_BOOKING_STATE_BOOKINGS_URL, CHANGE_SENT_BOOKING_STATE_BOOKINGS_URL, EDIT_BOOKING_URL,
    GET_BOOKINGS_URL, GET_OTHER_PERSON_HOUSES_URL,
    GET_RECEIVED_BOOKINGS_URL,
    REMOVE_BOOKINGS_URL
} from "../Urls";

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
    if(offeredHouseId) data.set("offeredHouseId", offeredHouseId);

    return (await axios.post(ADD_BOOKINGS_URL, data)).data;
}

export const removeSentBooking = async (id) => {
    return (await axios.delete(REMOVE_BOOKINGS_URL + "/" + id)).data;
}

export const changeReceivedBookingState = async (id, newState) => {
    const data = new FormData();
    data.set("bookingState", newState)
    return (await axios.post(CHANGE_RECEIVED_BOOKING_STATE_BOOKINGS_URL + "/" + id, data)).data;
}

export const changeSentBookingState = async (id, newState) => {
    const data = new FormData();
    data.set("bookingState", newState)
    return (await axios.post(CHANGE_SENT_BOOKING_STATE_BOOKINGS_URL + "/" + id, data)).data;
}

export const getOtherPersonHousesList = async (bookingId) => {//todo remove because useless
    return (await axios.get(GET_OTHER_PERSON_HOUSES_URL + "/" + bookingId)).data;
}


export const editBooking = async (bookingId, startDate, endDate, houseId) => {
    const data = new FormData();
    if(startDate) data.set("startDate", (new Date(startDate)).toDateString())
    if (endDate) data.set("endDate",(new Date(endDate)).toDateString())
    if(houseId) data.set("houseId", houseId)
    return (await axios.post(EDIT_BOOKING_URL + "/" + bookingId, data)).data;
}

export const acceptBooking = async (bookingId) => {
    return (await axios.patch(ACCEPT_BOOKING_URL + "/" + bookingId)).data;
}
