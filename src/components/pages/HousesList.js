import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {addHouse, getHouses} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

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
        console.log(newHouseTitle, newHouseDescription)
        addHouse(newHouseTitle, newHouseDescription, update)
        setIsAddingHouse(false);
    }

    return <>
        <h1>Liste de vos houses</h1>
        <hr/>
        <div>{JSON.stringify(houses)}</div>
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
                    Title <input type="text" onChange={(event) => newHouseTitle = event.target.value}/>
                    Description <input type="text" onChange={(event) => newHouseDescription = event.target.value}/>
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
