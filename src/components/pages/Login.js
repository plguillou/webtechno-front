import {useCallback} from "react";
import {loginAttempt} from "../utils/store/user/userActions";
import {useDispatch} from "react-redux";

export default function Login() {
    const dispatch = useDispatch()
    const logUser = useCallback((username, password) => {
        dispatch(loginAttempt(username, password))
    }, [dispatch])

    let username = "";
    let password = "";

    const handleLogClick = () => {
        logUser(username, password)
    }

    return <div>
        <p>Login Page</p>
        <label htmlFor={"username"}>
            <input type="text" id={"username"} onChange={(event => username = event.target.value)}/>
        </label>
        <label htmlFor={"password"}>
            <input type="text" id={"password"} onChange={(event => password = event.target.value)}/>
        </label>
        <button onClick={handleLogClick}>Log</button>
    </div>
}