import {Button, Image} from "react-bootstrap";
import EditPictureModal from "./EditPictureModal";
import {useState} from "react";

export default function HousePictures({pictures, houseId}) {
    const [editingPictureIndex, setEditingPictureIndex] = useState(-1);
    pictures = [0, 1, 2].map(elem => pictures && (pictures.hasOwnProperty(elem) && pictures[elem]));


    const onAddOrEditClick = (index) => {
        setEditingPictureIndex(index)
    }

    const oDeleteClick = (index) => {
        //todo
    }

    return <div>
        <h5>Photos de la résidence (max 3)</h5>
        <div className={"container-fluid  d-md-inline-flex justify-content-evenly"}>
            {pictures.map((photo, i) => (
                <div key={i}
                     className={"container d-flex flex-column justify-content-between p-3 rounded-2 mx-3 mb-2 max-width-md-35 border border-gray"}>
                    <h6 className={"mb-3"}>Photo {i + 1}</h6>

                    {photo ?
                        <Image style={{maxHeight: "20rem", cursor: "pointer"}}
                               className={"mx-auto mb-2"}
                            src={"https://placekitten.com/" + Math.ceil(Math.random() * 250 + 250) + "/" + Math.ceil(Math.random() * 250 + 250)}
                               // src={"http://localhost:8080/photos/bda.jpg"}//todo url
                               fluid alt="photo"/>
                        :
                        <div className={"bg-light text-center text-gray"}
                             style={{minHeight: "15em", paddingTop: "6rem", cursor: "pointer"}}
                             onClick={() => onAddOrEditClick(i)}>
                            Cliquer pour ajouter une photo
                        </div>
                    }
                    <div className={"d-flex justify-content-evenly"}>
                        <div>
                            <Button variant={"outline-success"} onClick={() => onAddOrEditClick(i)}>
                                {photo ? "Modifier" : "Ajouter"}
                            </Button>
                        </div>
                        {photo && <div><Button variant={"outline-danger"}>Supprimer</Button></div>}
                    </div>
                </div>
            ))}

        </div>

        <EditPictureModal show={editingPictureIndex > -1}
                          index={editingPictureIndex}
                          oldImageUrl={pictures[editingPictureIndex]?.url}
                          onHide={() => setEditingPictureIndex(-1)}
                          houseId={houseId}/>
    </div>
}