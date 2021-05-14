import './App.css';
import {Provider} from "react-redux";
import store from "./components/utils/store";
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
