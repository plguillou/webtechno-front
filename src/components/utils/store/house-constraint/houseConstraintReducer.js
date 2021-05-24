export const SET_HOUSE_CONSTRAINTS_ACTION = "SET_HOUSE_CONSTRAINTS_ACTION";

const defaultHouseConstraints = [];

export default function houseConstraintReducer (state = defaultHouseConstraints, action) {
    switch (action.type) {
        case SET_HOUSE_CONSTRAINTS_ACTION:
            return action.payload
        default:
            return state
    }
}
