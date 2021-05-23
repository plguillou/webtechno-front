import Header from "../common/Header";
import Footer from "../common/Footer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import {useSelector} from "react-redux";
import {userSelector} from "./store/user/userSelector";
import ExceptionPage from "../pages/ExceptionPage";
import HousesList from "../pages/HousesList";
import HouseDetails from "../pages/HouseDetails";
import Browser from "../pages/Browser";

export default function Routes() {
    const isLogged = useSelector(userSelector).isLogged;
    return <>
        <Router>
            <Header/>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/profile" component={isLogged ? Profile : ExceptionPage}/>
                <Route path="/houses-list" component={isLogged ? HousesList : ExceptionPage}/>
                <Route path="/house-details/:id" component={isLogged ? HouseDetails : ExceptionPage}/>
                <Route path="/browse" component={Browser}/>
                <Route path="/" component={Home}/>
            </Switch>
            <Footer/>
        </Router>
    </>
}