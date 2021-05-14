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
    return (
        <div className={"container-fluid p-5 w-50 border border-2 rounded-3"}>
            <Form>
                <Form.Group controlId="formBasicEmail" className={"mb-4"}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className={"mb-4"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className={"mb-4"}>
                    <Form.Check type="checkbox" label="Remember me"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}