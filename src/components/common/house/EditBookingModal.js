import {Button, Modal} from "react-bootstrap";

export default function EditBookingModal({show, onHide, bookingId, onAcceptClickOnReceivedBooking}) {

    function handleEditClick() {
        onAcceptClickOnReceivedBooking(bookingId)
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
                <h1 className={"text-gray text-center"}>WORK IN PROGRESS</h1>
                <div>
                    <p>Details et négociation du booking {bookingId}</p>
                </div>
                <Button onClick={handleEditClick} variant={"success"}>Accepter la demande </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant={"success"}>Valider</Button>
                <Button onClick={onHide} variant={"light"}>Annuler</Button>
            </Modal.Footer>
        </Modal>
    );
}
