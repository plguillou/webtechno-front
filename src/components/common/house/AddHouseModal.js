import {Button, Form, Modal} from "react-bootstrap";

export default function AddHouseModal({show, onHide, onNewHouseSubmit}) {
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