import {getHouseDetails, modifyHouseDetails} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";

function HouseDetails() {
    let {id} = useParams();
    const [isEditingHouse, setIsEditingHouse] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

    const [house, setHouse] = useState([]);
    let [newTitle, setNewTitle] = useState("");
    let [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        getHouseDetails(id, setHouse)
    }, [updateValue]);

    useEffect(() => {
        setNewTitle(house?.title)
        setNewDescription(house?.description)
    }, [house])

    const handleCancelClick = () => {
        setNewTitle(house?.title);
        setNewDescription(house?.description);
        setIsEditingHouse(false);
    }

    const handleOkClick = () => {
        modifyHouseDetails(id, newTitle, newDescription, update);
    }


    return <>
        <h1>Details de la house {id}</h1>
        <Button onClick={() => setIsEditingHouse(!isEditingHouse)}>Click here to edit toggle</Button>
        <div className={"container"}>
            <div className={"container-fluid"}>
                <div>Titre de votre résidence :</div>
                <div className={"m-auto"}>
                    <input className={"border bg-light text-fogra29"} value={newTitle}
                                                 disabled={!isEditingHouse} onChange={(e) => setNewTitle(e.target.value)}/>
                </div>
            </div>
            <br/>
            <div className={"container-fluid"}>
                <div>Description de votre résidence :</div>
                <div className={"m-auto"}>
                    <input className={"border bg-light text-fogra29"} value={newDescription}
                           disabled={!isEditingHouse} onChange={(e) => setNewDescription(e.target.value)}/>
                </div>
            </div>
            <div>
                {
                    isEditingHouse && <div>
                        <Button variant={"outline-success"} onClick={handleOkClick}>OK</Button>
                        <Button variant={"outline-secondary"} onClick={handleCancelClick}>Cancel</Button>
                    </div>
                }
            </div>
        </div>
    </>
}

export default HouseDetails;
