import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./user/UserReducer";
import thunk from "redux-thunk";
import axios from "axios";


const store = createStore(combineReducers({
    user: userReducer
}), applyMiddleware(thunk))

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
console.log("test")
if (localStorage.jwtToken) {
    axios.defaults.headers.common['Authorization'] = `${localStorage.jwtToken}`;
} else {
    delete axios.defaults.headers.common['Authorization'];
}


export default store;