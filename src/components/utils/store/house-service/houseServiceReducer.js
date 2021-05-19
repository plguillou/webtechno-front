export const SET_HOUSE_SERVICE_ACTION = "SET_HOUSE_SERVICE_ACTION";

const defaultHouseServices = [];

export default function houseServiceReducer (state = defaultHouseServices, action) {
    switch (action.type) {
        case SET_HOUSE_SERVICE_ACTION:
            return action.payload
        default:
            return state
    }
}
