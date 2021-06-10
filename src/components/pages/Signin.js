import {Alert, Button, Col, Form} from "react-bootstrap";
import {useState} from "react";
import {attemptSignin} from "../utils/requests/auth";
import {Link} from "react-router-dom";

export default function Signin() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [fields, setFields] = useState({email: "", password: "", passwordConfirm: "", username: ""})
    const [errors, setErrors] = useState({email: "", password: "", passwordConfirm: "", username: ""})

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log(fields);
        // console.warn(errors);
        if (fields.password !== fields.passwordConfirm || fields.password === "") {
            setErrors({...errors, passwordConfirm: "Le mot de passe ne correspond pas"})
            return;
        } else {
            setErrors({...errors, passwordConfirm: ""})
        }

        let {error, data} = await attemptSignin(fields.username, fields.password, fields.email);
        if (error && parseInt(error.status) !== 200) {
            setErrors({...errors, email: "Email déjà utilisé"})
            return;
        }
        setIsSignedIn(true);

    };

    return (<>
        {isSignedIn ? (

                <div className={"container p-5 my-5"}>
                    <div className={"container d-flex flex-column"}>
                        <h1 className={"text-center"}>Inscription réussie</h1>
                        <h3 className={"text-center m-3"}>Veuillez maintenant vous identifier :</h3>
                        <div className={"m-auto mt-2"}><Link to={"/login"}>
                            <Button variant={"outline-honey"}>Accéder au formulaire de connexion</Button>
                        </Link></div>
                    </div>
                </div>

            )
            :
            <div>
                <Form className={"container-fluid p-5 w-50 border border-2 rounded-3 mt-5 mb-5"}
                      onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} className={"mb-4"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control id={"tmp"}
                                          value={fields.email}
                                          required type="email"
                                          placeholder="Enter email"
                                          onChange={event => setFields({...fields, email: event.target.value})}/>
                            {errors.email.length > 0 && <Form.Text><Alert variant={"danger"}
                                                                          className={"p-1 m-1"}>{errors.email}</Alert></Form.Text>}
                        </Form.Group>

                        <Form.Group as={Col} className={"mb-4"}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required
                                          onChange={event => setFields({...fields, password: event.target.value})}/>
                        </Form.Group>
                        <Form.Group as={Col} className={"mb-4"}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required
                                          type="password" placeholder="Enter your password again"
                                          onChange={event => setFields({
                                              ...fields,
                                              passwordConfirm: event.target.value
                                          })}/>
                            {errors.passwordConfirm.length > 0 && <Form.Text><Alert variant={"danger"}
                                                                                    className={"p-1 m-1"}>{errors.passwordConfirm}</Alert></Form.Text>}
                        </Form.Group>

                        <Form.Group as={Col} className={"mb-4"}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="How should we call you ..."
                                          required
                                          onChange={event => setFields({...fields, username: event.target.value})}/>
                        </Form.Group>
                    </Form.Row>

                    {/*<Form.Row>*/}
                    {/*    <Form.Group controlId="formGridAddress" className={"mb-4"}>*/}
                    {/*        <Form.Label>Address</Form.Label>*/}
                    {/*        <Form.Control placeholder="1234 Main St" />*/}
                    {/*    </Form.Group>*/}

                    {/*    <Form.Group as={Col} controlId="formGridCountry" className={"mb-4"}>*/}
                    {/*        <Form.Label>Country</Form.Label>*/}
                    {/*        <Form.Control placeholder="Country">*/}
                    {/*        </Form.Control>*/}
                    {/*    </Form.Group>*/}

                    {/*    <Form.Group as={Col} controlId="formGridZip" className={"mb-4"}>*/}
                    {/*        <Form.Label>Zip</Form.Label>*/}
                    {/*        <Form.Control placeholder="Zip Code" />*/}
                    {/*    </Form.Group>*/}
                    {/*</Form.Row>*/}

                    {/*<Form.Group id="formGridCheckbox" className={"mb-4"}>*/}
                    {/*    <Form.Check type="checkbox" label="Remember me" />*/}
                    {/*</Form.Group>*/}

                    <Button variant="primary" type="submit" className={"w-25"}>
                        Sign in
                    </Button>
                </Form>
            </div>
        }
    </>);
}
