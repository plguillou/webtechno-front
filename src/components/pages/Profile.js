import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {logout} from "../utils/store/user/userActions";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function Profile() {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logout());
    }

    return <>
        <div>{JSON.stringify(user)}</div>{/*todo afficher ca mieux*/}
        <hr/>
        <Link to={"/"}>
            <Button onClick={handleLogOut}>Log out</Button>
        </Link>

        <Link to={"/houses-list"}><Button variant={"outline-secondary"}>Accedez a vos houses</Button></Link>

    </>
}

export default Profile;
