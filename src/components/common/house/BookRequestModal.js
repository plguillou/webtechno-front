import {Button, Modal} from "react-bootstrap";
import {userSelector} from "../../utils/store/user/userSelector";

export default function BookRequestModal({show, onHide}) {
    const userHouses = userSelector(userSelector)

    return <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Demande de réservation
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Choisissez la maison que vous souhaitez proposer au propriétaire</h4>
            <h6>Vous pourrez modifier ce choix par la suite</h6>
            <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
}