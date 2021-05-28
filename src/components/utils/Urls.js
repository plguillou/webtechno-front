const address = "http://localhost:8080"

export const HOME_URL = address + "/";
export const AUTH_URL = address + "/auth";
export const LOGIN_URL = address + "/login";

export const GET_USER_INFO_URL = address + "/user/get-user-info";
export const ADD_USER_HOUSE_URL = address + "/house/add";

export const GET_USER_HOUSES_URL = address + "/user/get-user-houses";
export const MODIFY_USER_HOUSE_DETAILS_URL = address + "/house";
export const UPLOAD_HOUSE_PICTURE_URL = address + "/picture/upload";

export const GET_HOUSE_CONSTRAINT_URL = address + "/house-constraint";
export const GET_HOUSE_SERVICE_URL = address + "/house-service";

export const GET_BOOKINGS_URL = address + "/bookings"
export const GET_RECEIVED_BOOKINGS_URL = address + "/bookings/received"
export const ADD_BOOKINGS_URL = address + "/bookings/add"
export const REMOVE_BOOKINGS_URL = address + "/bookings"
export const CHANGE_RECEIVED_BOOKING_STATE_BOOKINGS_URL = address + "/bookings/change-received-booking-state"
export const CHANGE_SENT_BOOKING_STATE_BOOKINGS_URL = address + "/bookings/change-sent-booking-state"

export const GET_ALL_USERS = address + "/admin/user/all";
export const DELETE_USER_BY_ID = address + "/admin/delete"