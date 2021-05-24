import {Button, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import {userSelector} from "../../utils/store/user/userSelector";
import {useSelector} from "react-redux";
import {useState} from "react";

export default function BookRequestModal({show, onHide}) {
    const userHousesIds = useSelector(userSelector).housesIds
    const [chosenHouse, setChosenHouse] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSendClick = () => {
        console.log("start date ", startDate)
        console.log("end date ", endDate)
        console.log("chosen house ", chosenHouse)
        onHide()
    }

    return <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Demande de réservation
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <h5>Choisissez vos dates</h5>
                <div className={"text-muted"}>Vous pourrez modifier ce choix par la suite</div>
                <br/>
                <div className={"container d-flex flex-column flex-sm-row justify-content-evenly p-2"}>
                    <div className={"container"}>
                        <div>Date de début</div>
                        <Form.Control type="date" onChange={(e) => setStartDate(new Date(e.target.value))} size={"sm"}
                                      className={"mx-1"}/>
                    </div>
                    <div className={"container"}>
                        <div>Date de fin</div>
                        <Form.Control type="date" onChange={(e) => setEndDate(new Date(e.target.value))} size={"sm"}
                                      className={"mx-1"}/>
                    </div>
                </div>
            </div>
            <hr/>
            <div>
                <h5>Choisissez la maison que vous souhaitez proposer au propriétaire</h5>
                <div className={"text-muted"}>Vous pourrez modifier ce choix par la suite</div>
                <DropdownButton id="dropdown-basic-button" title="Votre résidence" className={"pt-2"}>
                    {
                        userHousesIds.map((elem, i) => (
                            <Dropdown.Item key={i} onSelect={() => setChosenHouse(elem)}>
                                {elem}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>
                <div>{JSON.stringify(chosenHouse)}</div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSendClick} variant={"success"}>Envoyer la demande</Button>
            <Button onClick={onHide} variant={"light"}>Annuler</Button>
        </Modal.Footer>
    </Modal>
}