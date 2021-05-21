import {getHouseDetails, modifyHouseDetails} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import MultiChoiceList from "../common/MultiChoiceList";
import {useDispatch, useSelector} from "react-redux";
import {getAllHouseConstraints} from "../utils/store/house-constraint/houseConstraintAction";
import {houseConstraintSelector} from "../utils/store/house-constraint/houseConstraintSelector";
import {houseServiceSelector} from "../utils/store/house-service/houseServiceSelector";
import {getAllHouseServices} from "../utils/store/house-service/houseServiceAction";

function HouseDetails() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllHouseConstraints())
        dispatch(getAllHouseServices())
    }, [dispatch])
    const constraints = useSelector(houseConstraintSelector)
    const services = useSelector(houseServiceSelector)

    let {id} = useParams();
    const [isEditingHouse, setIsEditingHouse] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

    const [house, setHouse] = useState({});
    const [newHouse, setNewHouse] = useState({});

    useEffect(() => {
        getHouseDetails(id, setHouse)
    }, [updateValue, id]);

    useEffect(() => {
        setNewHouse(house);
    }, [house])


    const handleCancelClick = () => {
        setNewHouse(house);
        setIsEditingHouse(false);
    }

    const handleOkClick = () => {
        modifyHouseDetails(id, newHouse, update);
        setIsEditingHouse(false);
    }


    return <>
        <h1 className={"text-center mt-3"}>Details de la résidence "{house?.title}"</h1>

        <br/>

        <div className={"container border rounded-2 p-2 ps-3"}>
            {isEditingHouse ?
                <Button className={"float-end py-0 px-1"}
                        variant={"outline-danger"}
                        onClick={handleCancelClick}>
                    <i className={"bi bi-x text-center bi-type-bold"} style={{fontSize: "2rem", fontWeight: "1200"}}/>
                </Button> :
                <Button className={"float-end"}
                        variant={"outline-primary"}
                        onClick={() => setIsEditingHouse(true)}>
                    Edit
                </Button>
            }
            <div className={"d-lg-inline-flex justify-content-evenly container w-100"}>
                <div className={"w-75 mx-5 pt-4 pt-lg-0 "}>
                    <div className={"text-uppercase"}>Details</div>
                    <div className={"container-fluid p-2 m-1"}>
                        <div>Titre de votre résidence :</div>
                        <div >
                            <Form.Control
                                type={"text"}
                                className={"bg-light text-fogra29 border  " + (isEditingHouse ? "border-dark" : "")}
                                value={newHouse?.title ? newHouse?.title : ""}
                                disabled={!isEditingHouse}
                                onChange={(e) => setNewHouse({...newHouse, title: e.target.value})}/>
                        </div>
                    </div>
                    <br/>
                    <div className={"container-fluid"}>
                        <div>Description de votre résidence :</div>
                        <div>
                            <Form.Control as={"textarea"} rows={3}
                                          className={"border bg-light text-fogra29 " + (isEditingHouse ? "border-dark" : "")}
                                          value={newHouse?.description}
                                          disabled={!isEditingHouse}
                                          onChange={(e) => setNewHouse({...newHouse, description: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className={"w-75 mx-5"} >
                    <div className={"text-uppercase"}>Localisation</div>
                    <div className={"container-fluid p-2 m-1"}>
                        <div>Ville :</div>
                        <div className={"d-inline-flex"}>
                            <Form.Control
                                type={"text"}
                                className={"w-75 bg-light text-fogra29 border  " + (isEditingHouse ? "border-dark" : "")}
                                value={newHouse?.city ? newHouse?.city : ""}
                                disabled={!isEditingHouse}
                                onChange={(e) => setNewHouse({...newHouse, city: e.target.value})}/>
                            <Form.Control
                                type={"text"}
                                placeholder={"75001"}
                                className={"w-25 bg-light text-fogra29 border  " + (isEditingHouse ? "border-dark" : "")}
                                value={newHouse?.postalCode ? newHouse?.postalCode : ""}
                                disabled={!isEditingHouse}
                                onChange={(e) => setNewHouse({...newHouse, postalCode: e.target.value})}/>
                        </div>
                    </div>

                    <div className={"container-fluid p-2 m-1"}>
                        <div>Pays :</div>
                        <div >
                            <Form.Control
                                type={"text"}
                                className={"bg-light text-fogra29 border  " + (isEditingHouse ? "border-dark" : "")}
                                value={newHouse?.country ? newHouse?.country : ""}
                                disabled={!isEditingHouse}
                                onChange={(e) => setNewHouse({...newHouse, country: e.target.value})}/>
                        </div>
                    </div>

                    <div className={"container-fluid p-2 m-1"}>
                        <div>Adresse :</div>
                        <div >
                            <Form.Control
                                type={"text"}
                                className={"bg-light text-fogra29 border  " + (isEditingHouse ? "border-dark" : "")}
                                value={newHouse?.address ? newHouse?.address : ""}
                                disabled={!isEditingHouse}
                                onChange={(e) => setNewHouse({...newHouse, address: e.target.value})}/>
                        </div>
                    </div>

                </div>
            </div>
            <hr/>
            <div className={"d-lg-inline-flex justify-content-evenly align-content-center container-fluid"}>
                <div className={"h-auto border border-gray rounded-3 mx-5 my-2 p-2"}>
                    <HouseAttributeListAndEdit labelTitle={"Liste des contraintes liées à votre résidence"}
                                               attributeName={"contraintes"}
                                               newAttributes={newHouse?.constraints}
                                               allAttributes={constraints}
                                               isEditing={isEditingHouse}
                                               setNewAttributes={(newConstraints) => setNewHouse({
                                                   ...newHouse,
                                                   constraints: newConstraints
                                               })}

                    />
                </div>
                <div className={"h-auto border border-gray rounded-3 mx-5 my-2 p-2"}>
                    <HouseAttributeListAndEdit labelTitle={"Liste des services liées à votre résidence"}
                                               attributeName={"services"}
                                               newAttributes={newHouse?.services}
                                               allAttributes={services}
                                               isEditing={isEditingHouse}
                                               setNewAttributes={(newServices) => setNewHouse({
                                                   ...newHouse,
                                                   services: newServices
                                               })}

                    />
                </div>
            </div>


            {
                isEditingHouse && <>
                    <hr/>
                    <div className={"d-flex justify-content-end"}>
                        <Button variant={"outline-success"} onClick={handleOkClick}>OK</Button>
                        <Button variant={"outline-secondary"}
                                onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </>
            }

        </div>
    </>
}

const HouseAttributeListAndEdit = ({
                                       labelTitle,
                                       attributeName,
                                       newAttributes,
                                       allAttributes,
                                       isEditing,
                                       setNewAttributes
                                   }) => {

    return <div className={"container-fluid"}>
        <div className={"mb-1"}>{labelTitle} :</div>
        <div className={"container d-block"}>
            {newAttributes?.map((elem, i) => (
                <div key={i}>

                    <div className={"btn mt-1 border border-1 text-dark bg-gray rounded-10 rounded-pill"}
                         key={i}
                    >
                        {elem.title}
                        {isEditing &&
                        <Button variant={"outline-dark"} size={"sm"}
                                className={"rounded-circle border-dark border ms-2  px-1 py-0"}
                                onClick={() => {
                                    setNewAttributes(newAttributes.filter(e => e.id !== elem.id))
                                }}
                        >
                            <OverlayTrigger
                                key={"click-to-remove"}
                                placement={"right"}
                                overlay={
                                    <Tooltip id={"tooltip-click-to-remove"}>
                                        Click to remove
                                    </Tooltip>
                                }>
                                <i className="bi bi-x"/>
                            </OverlayTrigger>
                        </Button>
                        }
                    </div>


                </div>
            ))}
        </div>
        {isEditing && <MultiChoiceList listSelected={newAttributes}
                                       listTotal={allAttributes}
                                       onSelect={(item) => setNewAttributes([item, ...newAttributes])}
                                       title={"Liste des " + attributeName}
        />}
    </div>
}


export default HouseDetails;
