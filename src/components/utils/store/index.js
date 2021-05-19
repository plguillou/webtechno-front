import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./user/UserReducer";
import thunk from "redux-thunk";
import axios from "axios";
import {getUserInfos} from "./user/userActions";
import houseConstraintReducer from "./house-constraint/houseConstraintReducer";


const store = createStore(combineReducers({
    user: userReducer,
    houseConstraint: houseConstraintReducer
}), undefined,
    composeWithDevTools(
    applyMiddleware(thunk)
    )
)

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

if (localStorage.authJwtToken) {
    axios.defaults.headers.common['Authorization'] = `${localStorage.authJwtToken}`;
    store.dispatch(getUserInfos(localStorage.authJwtToken))
} else {
    delete axios.defaults.headers.common['Authorization'];
}


export default store;