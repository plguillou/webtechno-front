import {combineReducers, createStore} from "redux";
import userReducer from "./user/UserReducer";


const store = createStore(combineReducers({
    user: userReducer
}))

export default store;