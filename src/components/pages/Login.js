import {useCallback, useState} from "react";
import {loginAttempt} from "../utils/store/user/userActions";
import {useDispatch} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch()
    let history = useHistory()
    const logUser = useCallback((username, password) => {
        dispatch(loginAttempt(username, password))
    }, [dispatch])

    let username = "";
    let password = "";
    let [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        logUser(username, password);
        setTimeout(() => {
            if(localStorage.authJwtToken) {
                history.push("/");
            } else {
                setError("Bad credentials")
            }
        }, 500);
    }

    return (
        <div className={"container-fluid p-5 w-50 border border-2 rounded-3 mb-5"}>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Group controlId="formBasicEmail" className={"mb-4"}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className={error === "" ? "" : "border-danger"} onChange={(event => username = event.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className={"mb-4"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className={error === "" ? "" : "border-danger"} onChange={(event => password = event.target.value)}/>
                </Form.Group>
                {error !== "" && <p className={"alert-danger"}>{error}</p>}
                <Form.Group controlId="formBasicCheckbox" className={"mb-4"}>
                    <Form.Check type="checkbox" label="Remember me"/>
                </Form.Group>
                <Button variant="primary" type="submit" className={"w-25"}>
                    Login
                </Button>
            </Form>
        </div>
    );
}