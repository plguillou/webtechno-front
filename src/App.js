import './App.css';
import Header from "./components/common/Header";
import Home from "./components/pages/Home";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./components/pages/Login";
import Signin from "./components/pages/Signin";
import {Provider} from "react-redux";
import store from "./components/utils/store";
import Profile from "./components/pages/Profile";

function App() {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signin" component={Signin}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Router>
            </Provider>
        </>
    );
}

export default App;
