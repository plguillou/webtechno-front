import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {logout, getUserInfos} from "../utils/store/user/userActions";
import {Link, useParams} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProfileInfos, modifyProfileInfos} from "../utils/requests/profile";
import {getAllHouseConstraints} from "../utils/store/house-constraint/houseConstraintAction";
import {getAllHouseServices} from "../utils/store/house-service/houseServiceAction";
import {houseConstraintSelector} from "../utils/store/house-constraint/houseConstraintSelector";
import {houseServiceSelector} from "../utils/store/house-service/houseServiceSelector";
import HouseAttributeListAndEdit from "../common/house/HouseAttributeListAndEdit";

function Profile() {
    //const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logout());
    }

    // v Moi v

    useEffect(() => {
        dispatch(getAllHouseConstraints())
        dispatch(getAllHouseServices())
    }, [dispatch])

    let {id} = useParams();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

    /*
    ci-dessous je veux mettre user a la place de house
    or user existe deja, donc je met profile ?
    pcq si je fais pas la ligne ci-dessous je n'aurai pas
    d'équivalent de setHouse
    */

    const [user, setUser] = useState({});
    const [newUser, setNewUser] = useState({});

    useEffect(() => {
        getProfileInfos(setUser)
    }, [updateValue]);

    useEffect(() => {
        setNewUser(user);
    }, [user])


    const handleCancelClick = () => {
        setNewUser(user);
        setIsEditingProfile(false);
    }

    const handleOkClick = () => {
        modifyProfileInfos(newUser, update);
        setIsEditingProfile(false);
    }

    return <>

        <h1 className={"text-center mt-3"}>My Profile</h1>

        <br/>

        <div className={"container border rounded-2 p-2 ps-3 w-50"}>
            {isEditingProfile ?
                <Button className={"float-end py-0 px-1"}
                        variant={"outline-danger"}
                        onClick={handleCancelClick}>
                    <i className={"bi bi-x text-center bi-type-bold"} style={{fontSize: "2rem", fontWeight: "1200"}}/>
                </Button> :
                <Button className={"float-end"}
                        variant={"outline-primary"}
                        onClick={() => setIsEditingProfile(true)}>
                    Edit
                </Button>
            }
            <div className={"d-lg-inline-flex justify-content-evenly container w-100"}>
                <div className={"w-75 mx-5 pt-4 pb-5 pt-lg-0 "}>
                    <div className={"text-uppercase"}>Personal details</div>

                    <Input title={"Name"} variable={newUser?.name} isEditingProfile={isEditingProfile}
                           onInputChange={(e) => setNewUser({...newUser, name: e.target.value})}/>

                    <br/>
                    <Input title={"E-Mail"} variable={newUser?.mail}
                           isEditingProfile={isEditingProfile} type={"textarea"}
                           onInputChange={(e) => setNewUser({...newUser, mail: e.target.value})}/>
                </div>
            </div>

            {
                // EN DESSOUS CEST BON

                isEditingProfile && <>
                    <hr/>
                    <div className={"d-flex justify-content-end"}>
                        <div className={"m-2"}>
                            <Button variant={"outline-success"} onClick={handleOkClick}>OK</Button>
                        </div>
                        <div className={"m-2"}>
                            <Button variant={"outline-secondary"} onClick={handleCancelClick}>Cancel</Button>
                        </div>
                    </div>
                </>
            }

        </div>


        {

            /*<div>
            <input disabled value={user.name}/>
        </div>
        <div>
            <input disabled value={user.mail}/>
        </div>
        <div>
            <input disabled value={user.role}/>
        </div>
        <div>
            <input disabled value={user.isLogged}/>
        </div>*/}
        <hr/>

        <Link to={"/"} className={"m-5"}>
            <Button onClick={handleLogOut} className={"px-5"}>Log out</Button>
        </Link>

        <Link to={"/houses-list"} className={"m-5"}>
            <Button variant={"outline-secondary"} className={"px-3"}>Accedez a vos houses</Button>
        </Link>

    </>
}

const Input = ({title, variable, isEditingProfile, onInputChange, type = "text"}) => {
    return <div className={"container-fluid p-2 m-1"}>
        <div>{title} :</div>
        <div>
            <Form.Control
                type={type}
                className={"bg-light text-fogra29 border  " + (isEditingProfile ? "border-dark" : "")}
                value={variable ? variable : ""}
                disabled={!isEditingProfile}
                onChange={onInputChange}/>
        </div>
    </div>
}

export default Profile;
