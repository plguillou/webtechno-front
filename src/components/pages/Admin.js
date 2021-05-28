import {useEffect, useState} from "react";
import {getAllUsers, deleteUserById} from "../utils/requests/users";
import {getAllHouses} from "../utils/requests/houses";
import {Button, Table} from "react-bootstrap";
function Admin() {

    const [updateValue, setUpdateValue] = useState(false);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers(setUsers)
    }, [updateValue]);

    const [houses, setHouses] = useState([]);
    useEffect(() => {
        getAllHouses(setHouses)
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
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((elem, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{elem.name ? elem.name.replace(/(.{15})..+/, "$1 ...") : null}</td>
                            <Button variant={"light"} onClick={() => deleteUserById(elem.id)}>Supprimer</Button>
                         </tr>
                    ))
                }
            </tbody>
        </Table>

        <h2 class="mb-3">Liste des Houses</h2>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>User</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    houses.map((elem, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{elem.title ? elem.title.replace(/(.{25})..+/, "$1 ...") : null}</td>
                            <td>{true ? (elem.owner_id ? true.toString() : false.toString()) : null}</td>
                         </tr>
                    ))
                }
            </tbody>
        </Table>

    </body>
    </>

}

export default Admin;