import './App.css';
import Header from "./components/common/Header";
import Home from "./components/pages/Home";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./components/pages/Login";
import Signin from "./components/pages/Signin";
import {withRouter} from "react-router";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
