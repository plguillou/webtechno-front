import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {logout} from "../utils/store/user/userActions";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProfileInfos, modifyProfileInfos} from "../utils/requests/profile";

function Profile() {
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

                    <br/>
                    <Input title={"Password"} variable={newUser?.password}
                           isEditingProfile={isEditingProfile} type={"password"}
                           onInputChange={(e) => setNewUser({...newUser, password: e.target.value})}/>

                    {passwordAreSame ?
                        <br/>
                        :
                        <Form.Text className="text-danger">
                            Please confirm password
                        </Form.Text>
                    }
                    <Input title={"Confirm Password"} variable={newUser?.confirmPassword}
                           isEditingProfile={isEditingProfile} type={"password"}
                           onInputChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}/>
                </div>
            </div>

            {

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
