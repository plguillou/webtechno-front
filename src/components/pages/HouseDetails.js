import {getHouseDetails, modifyHouseDetails} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllHouseConstraints} from "../utils/store/house-constraint/houseConstraintAction";
import {houseConstraintSelector} from "../utils/store/house-constraint/houseConstraintSelector";
import {houseServiceSelector} from "../utils/store/house-service/houseServiceSelector";
import {getAllHouseServices} from "../utils/store/house-service/houseServiceAction";
import HouseAttributeListAndEdit from "../common/house/HouseAttributeListAndEdit";

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

                    <Input title={"Titre de votre résidence"} variable={newHouse?.title} isEditingHouse={isEditingHouse}
                           onInputChange={(e) => setNewHouse({...newHouse, title: e.target.value})}/>

                    <br/>
                    <Input title={"Description de votre résidence"} variable={newHouse?.description}
                           isEditingHouse={isEditingHouse} type={"textarea"}
                           onInputChange={(e) => setNewHouse({...newHouse, description: e.target.value})}/>


                </div>
                <div className={"w-75 mx-5"}>
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

                    <Input title={"Pays"} variable={newHouse?.country} isEditingHouse={isEditingHouse}
                           onInputChange={(e) => setNewHouse({...newHouse, country: e.target.value})}/>

                    <Input title={"Adresse"} variable={newHouse?.address} isEditingHouse={isEditingHouse}
                           onInputChange={(e) => setNewHouse({...newHouse, address: e.target.value})}/>


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

const Input = ({title, variable, isEditingHouse, onInputChange, type = "text"}) => {
    return <div className={"container-fluid p-2 m-1"}>
        <div>{title} :</div>
        <div>
            <Form.Control
                type={type}
                className={"bg-light text-fogra29 border  " + (isEditingHouse ? "border-dark" : "")}
                value={variable ? variable : ""}
                disabled={!isEditingHouse}
                onChange={onInputChange}/>
        </div>
    </div>
}


export default HouseDetails;
