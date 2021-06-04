import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import {getAllUsers, deleteUserById} from "../utils/requests/users";
import {getAllHouses, deleteHouseById} from "../utils/requests/houses";
import {Button, Table} from "react-bootstrap";
function Admin() {

    const [updateValue, setUpdateValue] = useState(false);

    const update = () => setUpdateValue(updateValue + 1);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers(setUsers)
    }, [updateValue]);

    const [houses, setHouses] = useState([]);
    useEffect(() => {
        getAllHouses(setHouses)
    }, [updateValue]);

    const onClickCancelUser = (id) => {
        deleteUserById(id).then(() => update())
    }
    
    const onClickCancelHouse = (id) => {
        deleteHouseById(id).then(() => update())
    }

    const [showDeleteUser, setShowDeleteUser] = useState(false);

    const handleCloseDeleteUser = () => setShowDeleteUser(false);
    const handleShowDeleteUser = () => setShowDeleteUser(true); 

    const [showDeleteHouse, setShowDeleteHouse] = useState(false);

    const handleCloseDeleteHouse = () => setShowDeleteHouse(false);
    const handleShowDeleteHouse = () => setShowDeleteHouse(true); 


    return <>
    <body  class="mb-2 mt-2">
        <h1 class="mb-3">Admin</h1>

        <h2 class="mb-3">Liste des Users</h2>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Rôle</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((elem, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{elem.name ? elem.name.replace(/(.{15})..+/, "$1 ...") : null}</td>
                            <td>{elem.role ? elem.role.replace(/(.{15})..+/, "$1 ...") : null}</td>
                            <td > 
                                
                               

                            <Button variant={"outline-danger"} disabled={elem.role == "ADMIN"} onClick={handleShowDeleteUser}>
                                Supprimer
                            </Button>
                                


                            <Modal show={showDeleteUser} onHide={handleCloseDeleteUser}>
                                <Modal.Header>
                                    <Modal.Title>Suppression utilisateur</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Attention, toute suppression est définitive, êtes-vous sûr de poursuivre ?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseDeleteUser}>
                                        Retour
                                    </Button>
                                    <Button variant="danger" onClick={() => {onClickCancelUser(elem.id); setShowDeleteUser(false);}}>
                                         Supprimer utilisateur
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            </td>
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
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    houses.map((elem, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{elem.title ? elem.title.replace(/(.{25})..+/, "$1 ...") : null}</td>
                            <td>{elem.description ? elem.description.replace(/(.{90})..+/, "$1 ...") : null}</td>
                            <td >

                                

                            <Button variant={"outline-danger"} onClick={handleShowDeleteHouse}>
                                Supprimer
                            </Button>

                            <Modal show={showDeleteHouse} onHide={handleCloseDeleteHouse}>
                                <Modal.Header>
                                    <Modal.Title>Suppression House</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Attention, toute suppression est définitive, êtes-vous sûr de poursuivre ?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseDeleteHouse}>
                                        Retour
                                    </Button>
                                    <Button variant="danger" onClick={() => {onClickCancelHouse(elem.id); setShowDeleteHouse(false);}}>
                                         Supprimer house
                                    </Button>
                                </Modal.Footer>
                            </Modal>



                            <Button href = {"/house-details/" + elem.id} variant={"light"}>
                                Infos
                            </Button>

                            </td>
                            
                         </tr>
                    ))
                }
            </tbody>
        </Table>

    </body>
    </>

}

export default Admin;