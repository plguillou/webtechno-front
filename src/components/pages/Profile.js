import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {useCallback, useState} from "react";
import {loginAttempt, setUser} from "../utils/store/user/userActions";
import axios from "axios";
import {AUTH_URL} from "../utils/Urls";

function Profile() {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()
    const onClick = useCallback((user) => {
        dispatch(setUser(user))
    },[dispatch])

    const connectAdmin = useCallback((username, password) => {
        dispatch(loginAttempt(username, password))
    },[dispatch])

    let [authMessage, setAuthMessage] = useState("not auth");
    const testAuth = () => {
        axios.post(AUTH_URL).then( (response) => {
            console.log(response.data)
            setAuthMessage(response.data);
        })
    }

    return <>
        <div>{JSON.stringify(user)}</div>
        <button onClick={() => onClick({name:'test'})}>set user</button>
        <p>Log as admin/pass</p>
        <button onClick={() => connectAdmin("admin", "pass")}>Log as admin</button>
        <hr/>
        <p>is auth : {authMessage}</p>
        <button onClick={() => testAuth()}>Test auth</button>

    </>
}

export default Profile;
