import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "../../Styles/HeaderStyle.css"
import {logout} from "../utils/store/user/userActions";

function Header() {
    const isUserLogged = useSelector(userSelector).isLogged;
    const dispatch = useDispatch()

    return (
        <Navbar bg="dark" sticky="top" expand="lg" className="justify-content-between shadow-sm">
            <Link to="/" className="text-decoration-none">
                <Navbar.Brand href="#home" className="mx-4 px-2 bg-honey rounded-10">
                    Home Exchange Manager
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <div className="container-fluid w-100 d-flex justify-content-between">
                    <Nav className="d-flex justify-content-center align-items-center mr-auto fs-5">
                        <Nav.Link href="/" className="text-honey">Home</Nav.Link>
                        <Nav.Link href="/browse" className="text-honey">Browse</Nav.Link>
                    </Nav>
                    <Nav className="self">
                        {isUserLogged ?
                            <NavDropdown title="My Space" id="basic-nav-dropdown" className="px-4 fs-5">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">My Housings</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">My Bookings</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Conversations</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={() => dispatch(logout())}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <>
                                <Link to="/login">
                                    <Button variant="outline-honey" className="mx-2">Log in</Button>
                                </Link>
                                <Link to="/signin">
                                    <Button variant="outline-orange" className="mx-2">Sign-up</Button>
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
