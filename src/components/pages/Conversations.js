import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {logout, getUserInfos} from "../utils/store/user/userActions";
import {Link, useParams} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProfileInfos, modifyProfileInfos} from "../utils/requests/profile";

function Conversations() {
    const userInit = useSelector(userSelector);
    userInit.password = "";
    userInit.confirmPassword = "";
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
    }

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [passwordAreSame, setPasswordAreSame] = useState(true);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

    const [user, setUser] = useState(userInit);
    const [newUser, setNewUser] = useState({});

    const [otherUser, setOtherUser] = useState({userInit});
    otherUser.name = "Other User";
    otherUser.mail = "other@user.com";

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
        if (newUser.password === newUser.confirmPassword) {
            setPasswordAreSame(true);
            modifyProfileInfos(newUser, update);
            setIsEditingProfile(false);
        } else {
            setPasswordAreSame(false);
        }
    }

    return <>

        <div className={"d-lg-inline-flex justify-content-center container w-100 pt-2 m-2"}>
            <div className={"w-25"}>
                <div className={"container-fluid"}>
                    <div>
                        <Form.Control
                            type={"text"}
                            className={"bg-light text-fogra29 border  " + (isEditingProfile ? "border-dark" : "")}
                            value={otherUser?.name}
                            disabled={!isEditingProfile}
                            onChange={(e) => setOtherUser({...otherUser, name: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className={""}>
                {isEditingProfile ?
                    ""
                    :
                    <Button className={"float-end"}
                            variant={"outline-primary"}
                            onClick={() => setIsEditingProfile(true)}>
                        Edit
                    </Button>
                }
            </div>
            <div>
                {

                    isEditingProfile && <>
                        <div className={"d-flex justify-content-end"}>
                            <div className={"mx-2"}>
                                <Button variant={"outline-success"} onClick={handleOkClick}>OK</Button>
                            </div>
                            <div className={"mx-2"}>
                                <Button variant={"outline-secondary"} onClick={handleCancelClick}>Cancel</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>

        <hr/>

        <div className={"d-lg-inline-flex justify-content-evenly container w-100"}>
            <div className={"w-75 mx-5 pt-4 pb-5 pt-lg-0 "}>

                <Message title={"Name"} variable={newUser?.name} isEditingProfile={isEditingProfile}
                         myMessage={false}/>

                <br/>
                <Message title={"Name"} variable={newUser?.name} isEditingProfile={isEditingProfile}
                         myMessage={true}/>

                <br/>
                <Message title={"E-Mail"} variable={newUser?.mail} isEditingProfile={isEditingProfile}
                         myMessage={false}/>

                <br/>
            </div>
        </div>






        <hr/>

        <div className={"d-lg-inline-flex justify-content-center container w-100 pt-2 m-2"}>
            <div className={"w-25"}>
                <div className={"container-fluid"}>
                    <div>
                        <Form.Control
                            type={"text"}
                            className={"bg-light text-fogra29 border  " + (isEditingProfile ? "border-dark" : "")}
                            placeholder={"Enter new message here ..."}
                            onChange={(e) => setOtherUser({...otherUser, name: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className={""}>
                {isEditingProfile ?
                    ""
                    :
                    <Button className={"float-end"}
                            variant={"outline-primary"}
                            onClick={() => setIsEditingProfile(true)}>
                        Edit
                    </Button>
                }
            </div>
            <div>
                {

                    isEditingProfile && <>
                        <div className={"d-flex justify-content-end"}>
                            <div className={"mx-2"}>
                                <Button variant={"outline-success"} onClick={handleOkClick}>OK</Button>
                            </div>
                            <div className={"mx-2"}>
                                <Button variant={"outline-secondary"} onClick={handleCancelClick}>Cancel</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
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

const Message = ({title, variable, isEditingProfile, myMessage, type = "text"}) => {
    return <div className={"container-fluid px-2 py-3 my-1 w-100 "}>
        <div>
            <Form.Control
                type={type}
                className={"bg-light text-fogra29 w-50 border  " + (isEditingProfile ? "border-dark " : " ")  + (myMessage ? "float-end mr-1" : "float-start ml-1")}
                value={variable ? variable : ""}
                disabled={!isEditingProfile}/>
        </div>
    </div>
}

export default Conversations;
