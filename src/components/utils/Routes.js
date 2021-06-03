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
import Bookings from "../pages/Bookings";
import Admin from "../pages/Admin";
import Browser from "../pages/Browser";


export default function Routes() {
    const isLogged = useSelector(userSelector).isLogged;
    const isAdmin = (useSelector(userSelector).role === "ADMIN");
    return <>

        <Router>
            <Header/>
            <div style={{minHeight: "85vh"}}>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/profile" component={isLogged ? Profile : ExceptionPage}/>
                    <Route path="/houses-list" component={isLogged ? HousesList : ExceptionPage}/>
                    <Route path="/house-details/:id" component={isLogged ? HouseDetails : ExceptionPage}/>
                    <Route path="/admin" component={(isLogged && isAdmin) ? Admin : ExceptionPage}/>
                    <Route path="/bookings" component={isLogged ? Bookings : ExceptionPage}/>
                    <Route path="/browse" component={Browser}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
            <Footer/>
        </Router>

    </>
}
