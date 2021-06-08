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

        <div style={{height: '85vh', width: '99vw'}} className={"d-lg-inline-flex justify-content-evenly"}> {/* Contient tout */}

            <div style={{width: '25vw'}} className={"border-end"}>{/* La partie contact */}
                <div>
                    <div className={"p-3 border-bottom"}>
                        Contact 1
                    </div>
                    <div className={"p-3 border-bottom"}>
                        Contact 2
                    </div>
                    <div className={"p-3 border-bottom"}>
                        Contact 3
                    </div>
                    <div className={"p-3 border-bottom"}>
                        Contact 4
                    </div>
                </div>
            </div>

            <div style={{width: '75vw'}} className={""}>{/* La partie messages */}
                <div style={{height: '67vh', display: 'block', overflowY: "auto"}} className={"container"}>
                    {/*<div className={"w-75 mx-5 pt-4 pb-5 pt-lg-0"}>*/}

                    <Message content={newUser?.name} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>

                    <Message content={newUser?.name} myMessage={true}/>

                    <Message content={newUser?.mail} myMessage={false}/>


                    <br/>
                </div>




                <hr/>




                <div className={"d-lg-inline-flex justify-content-center container pt-2"}>
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
                                Send
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




            </div>
        </div>

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

const Message = ({content, myMessage}) => {
    return <div className={"container-fluid px-2 py-3 my-1 "}>
        <div style={{display: "block"}} className={"py-3"}>
            <div
                style={{borderRadius: 25}}
                className={"bg-light text-fogra29 p-2 border " + (myMessage ? "float-end mr-1" : "float-start ml-1")}>
                {content ? content : ""}
            </div>
        </div>
    </div>
}

export default Conversations;
