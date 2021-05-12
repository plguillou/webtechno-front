import {Button, Form} from "react-bootstrap";

export default function Login() {
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