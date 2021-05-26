import {Alert, Button, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import {userSelector} from "../../utils/store/user/userSelector";
import {useSelector} from "react-redux";
import {useState} from "react";
import {addNewBooking} from "../../utils/requests/bookings";

export default function BookRequestModal({show, onHide, selectedHouseId}) {
    const userHouses = useSelector(userSelector).houses
    const [chosenHouse, setChosenHouse] = useState(null);
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSendClick = () => {
        if (!startDate || !endDate) return setErrorMessage("Il faut saisir 2 dates valides");
        if (endDate < startDate) return setErrorMessage("Date de fin avant date de début");
        if (startDate < new Date()) return setErrorMessage("Date de début déjà passée");
        setErrorMessage("");
        setIsSending(true)
        // console.log("start date ", startDate)
        // console.log("end date ", endDate)
        // console.log("chosen house ", chosenHouse)
        addNewBooking(startDate, endDate, selectedHouseId, chosenHouse).then(r => {
            // console.log(r)
            setIsSending(false)
            onHide()
        })
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
                <Form
                    className={"container d-flex flex-column flex-sm-row justify-content-evenly p-2"}>
                    <div className={"container"}>
                        <div>Date de début</div>
                        <Form.Control required type="date" onChange={(e) => setStartDate(new Date(e.target.value))}
                                      size={"sm"}
                                      className={"mx-1"}/>
                    </div>
                    <div className={"container"}>
                        <div>Date de fin</div>
                        <Form.Control required type="date" onChange={(e) => setEndDate(new Date(e.target.value))}
                                      size={"sm"}
                                      className={"mx-1"}/>
                    </div>

                </Form>
                {errorMessage && <Alert variant={"danger"} className={"py-1 m-1"}>{errorMessage}</Alert>}
            </div>
            <hr/>
            <div>
                <h5>Choisissez la maison que vous souhaitez proposer au propriétaire</h5>
                <div className={"text-muted"}>Vous pourrez modifier ce choix par la suite</div>
                <DropdownButton id="dropdown-basic-button" title="Votre résidence" className={"pt-2"}>
                    {
                        userHouses?.map((elem, i) => (
                            <Dropdown.Item key={i} onSelect={() => setChosenHouse(elem)}>
                                {elem.title}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>
                <div>{JSON.stringify(chosenHouse)}</div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSendClick} variant={"success"} disabled={isSending}>Envoyer la demande</Button>
            <Button onClick={onHide} variant={"light"}>Annuler</Button>
        </Modal.Footer>
    </Modal>
}