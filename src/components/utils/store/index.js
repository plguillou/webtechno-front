import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./user/UserReducer";
import thunk from "redux-thunk";
import axios from "axios";
import {getUserInfos} from "./user/userActions";


const store = createStore(combineReducers({
    user: userReducer
}), undefined,
    composeWithDevTools(
    applyMiddleware(thunk)
    )
)

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

if (localStorage.authJwtToken) {
    console.log("token found in local storage")
    axios.defaults.headers.common['Authorization'] = `${localStorage.authJwtToken}`;
    store.dispatch(getUserInfos(localStorage.authJwtToken))
} else {
    delete axios.defaults.headers.common['Authorization'];
}


export default store;