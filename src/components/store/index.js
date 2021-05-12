import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./user/UserReducer";
import thunk from "redux-thunk";


const store = createStore(combineReducers({
    user: userReducer
}), applyMiddleware(thunk))

export default store;