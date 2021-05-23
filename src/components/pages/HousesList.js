import {addHouse, getHouses} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import AddHouseModal from "../common/house/AddHouseModal";

function HousesList() {
    const [isAddingHouse, setIsAddingHouse] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue+1);

    const [houses, setHouses] = useState([]);
    useEffect(() => {
        getHouses(setHouses)
    }, [updateValue]);

    const onNewHouseSubmit = (newHouseTitle, newHouseDescription) => {
        if(newHouseTitle === "") return;
        console.log(newHouseTitle, newHouseDescription)
        addHouse(newHouseTitle, newHouseDescription, update)
        setIsAddingHouse(false);
    }

    return <>
        <h1>Liste de vos houses</h1>
        <hr/>
        {
            houses.map((elem, i) => (
                <div key={i} className={"d-flex"}>
                    <div>{JSON.stringify(elem)}</div>
                    <Link to={"/house-details/" + elem.id}><Button variant={"outline-secondary"}>Voir les détails</Button></Link>
                </div>
            ))
        }

        <hr/>
        <Button onClick={() => setIsAddingHouse(true)}>Ajouter une house</Button>
        <AddHouseModal show={isAddingHouse} onHide={() => setIsAddingHouse(false)} onNewHouseSubmit={onNewHouseSubmit}/>
    </>
}

export default HousesList;
