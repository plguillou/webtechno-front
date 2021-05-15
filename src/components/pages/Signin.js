import {Button, Col, Form} from "react-bootstrap";

export default function Signin() {//todo non fonctionnel
    return (
    <div>
        <Form className={"container-fluid p-5 w-50 border border-2 rounded-3 mb-5"}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail" className={"mb-4"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" className={"mb-4"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPasswordConfirm" className={"mb-4"}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password again" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName" className={"mb-4"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="How should we call you ..." />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group controlId="formGridAddress" className={"mb-4"}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCountry" className={"mb-4"}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control placeholder="Country">
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip" className={"mb-4"}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control placeholder="Zip Code" />
                </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox" className={"mb-4"}>
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit" className={"w-25"}>
                Sign in
            </Button>
        </Form>
    </div>
    );
}