import {addHouse, getHouses} from "../utils/requests/houses";
import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
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
    <body  class="mb-2 mt-2">
        <h1 class="mb-3">Liste de vos houses</h1>
        <Table striped bordered hover>
            <thead>
                <tr>

                    <th>#</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Ville</th>
                    <th>Details</th>
                </tr>
            </thead>

            <tbody>
               
                {
                    houses.map((elem, i) => (
                        <tr>
                       

                   
                            <td>{i + 1}</td>
                            <td>{elem.title}</td>
                            <td>{elem.description}</td>
                            <td>{elem.city}</td>
                            <td><Link to={"/house-details/" + elem.id}><Button variant={"outline-secondary"}>Voir les détails</Button></Link></td>
                          
                            
                       
                         </tr>
                    ))
                }


            </tbody>
        </Table>
        <Button onClick={() => setIsAddingHouse(true)}>Ajouter une house</Button>
        <AddHouseModal show={isAddingHouse} onHide={() => setIsAddingHouse(false)} onNewHouseSubmit={onNewHouseSubmit}/>
    </body>
    </>
}

export default HousesList;
