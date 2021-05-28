import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {uploadPicture} from "../../utils/requests/houses";

export default function EditPictureModal({show, onHide, index, oldImageUrl}) {
    let newUrl = oldImageUrl;
    let [pictureFile, setPictureFile] = useState();

    const onFileAddClick = () => {
        uploadPicture(pictureFile)
    }

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
                    Modifier ou ajouter l'image n°{index + 1}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form onSubmit={onHide}>
                        <Form.Group className={"mb-4"}>
                            <Form.Label>Url de l'image</Form.Label>
                            <Form.Control type="text" placeholder={oldImageUrl || "Enter url"}
                                          defaultValue={newUrl}
                                          onChange={(event) => newUrl = event.target.value}/>
                        </Form.Group>
                        <div>Ou</div>
                        <Form.Group>
                            <Form.Label>Uploader une image</Form.Label>
                            <br/>
                            <Form.File custom onChange={(e) => setPictureFile(e.target.files[0]) } />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onFileAddClick}>OK</Button>{/*todo onclick*/}
                <Button onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}