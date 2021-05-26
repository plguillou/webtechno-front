import {useEffect, useState} from "react";
import {getAllUsers} from "../utils/requests/users";
import {Button, Table} from "react-bootstrap";
function Admin() {

    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue+1);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers(setUsers)
    }, [updateValue]);


    return <>
    <body  class="mb-2 mt-2">
        <h1 class="mb-3">Admin</h1>
        <h2 class="mb-3">Liste des Users</h2>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((elem, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{elem.name ? elem.name.replace(/(.{25})..+/, "$1 ...") : null}</td>
                         </tr>
                    ))
                }
            </tbody>
        </Table>

    </body>
    </>

}

export default Admin;