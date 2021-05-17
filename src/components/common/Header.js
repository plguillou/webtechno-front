import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

function Header() {
    const isUserLogged = useSelector(userSelector).isLogged;

    return (
        <Navbar bg="silver" sticky="top" expand="lg" className={"justify-content-between shadow-sm"}>
            <Link to="/" className="text-decoration-none">
                <Navbar.Brand href="#home" className="mx-4 px-2 bg-honey rounded-10">
                    Home Exchange Manager
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <div className="container-fluid w-100 d-flex justify-content-between">
                    <Nav className="mr-auto fs-5">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/#browserSection">Browse</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className={"self"}>
                        {isUserLogged ?
                            <Link to="/profile">Profile</Link>
                            :
                            <>
                                <Link to="/login">
                                    <Button variant="outline-honey" className={"mx-2"}>Log in</Button>
                                </Link>
                                <Link to="/signin">
                                    <Button variant="outline-orange" className={"mx-2"}>Sign-up</Button>
                                </Link>
                            </>
                        }
                    </Nav>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
