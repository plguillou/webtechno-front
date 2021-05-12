import {Button, Col, Form} from "react-bootstrap";

export default function Signin() {
    return (
    <div>
        <Form className={"container-fluid p-5 w-50 border border-2 rounded-3"}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail" className={"mb-4"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" className={"mb-4"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1" className={"mb-4"}>
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity" className={"mb-4"}>
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" className={"mb-4"}>
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>Bourre La Reine</option>
                        <option>LALLALLALALLAA MATTHIEU...</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip" className={"mb-4"}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox" className={"mb-4"}>
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
    );
}