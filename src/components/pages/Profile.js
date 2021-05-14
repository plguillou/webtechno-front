import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {useState} from "react";
import {logout} from "../utils/store/user/userActions";
import axios from "axios";
import {AUTH_URL} from "../utils/Urls";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function Profile() {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    let [authMessage, setAuthMessage] = useState("not auth");
    const testAuth = () => {
        axios.post(AUTH_URL).then((response) => {
            console.log(response.data)
            setAuthMessage(response.data);
        })
    }

    const handleLogOut = () => {
        dispatch(logout());
    }

    return <>
        <div>{JSON.stringify(user)}</div>
        <hr/>
        <p>is auth : {authMessage}</p>
        <button onClick={() => testAuth()}>Test auth</button>
        <hr/>
        <Link to={"/"}>
            <Button onClick={handleLogOut}>Log out</Button>
        </Link>

    </>
}

export default Profile;
