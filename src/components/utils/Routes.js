import Header from "../common/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import {useSelector} from "react-redux";
import {userSelector} from "./store/user/userSelector";
import ExceptionPage from "../pages/ExceptionPage";

export default function Routes() {
    const isLogged = useSelector(userSelector).isLogged;
    return <>
        <Router>
            <Header/>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/profile" component={isLogged ? Profile : ExceptionPage}/>
                <Route path="/" component={Home}/>
            </Switch>
        </Router>
    </>
}