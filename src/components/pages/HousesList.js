import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {addHouse, getHouses} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

function HousesList() {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()
    const [isAddingHouse, setIsAddingHouse] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue+1);

    const [houses, setHouses] = useState([]);
    useEffect(() => {
        getHouses(setHouses)
    }, [updateValue]);

    const onNewHouseSubmit = (newHouseTitle, newHouseDescription) => {
        if(newHouseTitle === "") return;
        console.log(newHouseTitle, newHouseDescription)
        addHouse(newHouseTitle, newHouseDescription, update)
        setIsAddingHouse(false);
    }

    return <>
        <h1>Liste de vos houses</h1>
        <hr/>
        {
            houses.map((elem, i) => (
                <div key={i} className={"d-flex"}>
                    <div>{JSON.stringify(elem)}</div>
                    <div>Voir les détails</div>
                </div>
            ))
        }

        <hr/>
        <Button onClick={() => setIsAddingHouse(true)}>Ajouter une house</Button>
        <MyVerticallyCenteredModal show={isAddingHouse} onHide={() => setIsAddingHouse(false)} onNewHouseSubmit={onNewHouseSubmit}/>
    </>
}


function MyVerticallyCenteredModal({show, onHide, onNewHouseSubmit}) {
    let newHouseTitle = ""
    let newHouseDescription = ""

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ajouter une résidence
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form onSubmit={(event) => {event.preventDefault(); onNewHouseSubmit(newHouseTitle, newHouseDescription)}}>
                        <Form.Group controlId="formBasicEmail" className={"mb-4"}>
                            <Form.Label>Titre de votre résidence</Form.Label>
                            <Form.Control type="email" placeholder="Enter title" onChange={(event) => newHouseTitle = event.target.value}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className={"mb-4"}>
                            <Form.Label>Description de votre résidence</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" onChange={(event) => newHouseDescription = event.target.value} />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onNewHouseSubmit(newHouseTitle, newHouseDescription)}>OK</Button>
                <Button onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HousesList;
