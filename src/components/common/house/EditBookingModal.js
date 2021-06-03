import {Button, Modal} from "react-bootstrap";

export default function EditBookingModal({show, onHide}) {

    function handleEditClick() {
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Négocier ou modifier le booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                body
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleEditClick} variant={"success"}>Valider</Button>
                <Button onClick={onHide} variant={"light"}>Annuler</Button>
            </Modal.Footer>
        </Modal>
    );
}
