import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {logout} from "../utils/store/user/userActions";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {getHouses} from "../utils/requests/houses";
import {useEffect, useState} from "react";

function Profile() {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const [houses, setHouses] = useState([]);
    useEffect(() => {
        getHouses(setHouses)
    }, []);

    const handleLogOut = () => {
        dispatch(logout());
    }

    return <>
        <div>{JSON.stringify(user)}</div>{/*todo afficher ca mieux*/}
        <hr/>
        <Link to={"/"}>
            <Button onClick={handleLogOut}>Log out</Button>
        </Link>
        <div>{JSON.stringify(houses)}</div>
        <Link to={"/houses-list"}>Accedez a vos houses</Link>

    </>
}

export default Profile;
