import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

function Header() {
    const isUserLogged = useSelector(userSelector).isLogged;

    return <Navbar bg="light" expand="lg" className={"justify-content-between"}>

        <Link to="/">
            <Navbar.Brand href="#home">Home Exchange Manager</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <div className={"container-fluid w-100 d-flex justify-content-between"}>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
                <Nav className={"self"}>
                    {isUserLogged ?
                        <Link to="/profile">Profile</Link>
                        :
                        <>
                            <Link to="/signin">
                                <Button variant="outline-success" className={"mx-2"}>Sign-in</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline-primary" className={"mx-2"}>Log in</Button>
                            </Link>
                        </>
                    }
                </Nav>
            </div>
        </Navbar.Collapse>

    </Navbar>
}

export default Header;
