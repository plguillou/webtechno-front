import {Link} from "react-router-dom";

function Header() {
    return <div className={"border-primary"}>
        <h2>Header</h2>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signin">Signin</Link>
                    </li>
                </ul>
            </div>
    </div>
}

export default Header;
