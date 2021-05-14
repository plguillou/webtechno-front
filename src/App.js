import './App.css';
import Header from "./components/common/Header";
import Home from "./components/pages/Home";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./components/pages/Login";
import Signin from "./components/pages/Signin";
import {Provider, useSelector} from "react-redux";
import store from "./components/utils/store";
import Profile from "./components/pages/Profile";
import {userSelector} from "./components/utils/store/user/userSelector";
import Routes from "./components/utils/Routes";

function App() {
    return (
        <>
            <Provider store={store}>
                <Routes />
            </Provider>
        </>
    );
}

export default App;
