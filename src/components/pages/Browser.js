import SearchBar from "./SearchBar";
import {Button, Card} from "react-bootstrap";
import {useState} from "react";

export default function Browser() {
    const [browsedHouses, setBrowsedHouses] = useState([]);

    return(
        <>
            <div className="d-flex justify-content-center align-items-center py-5 bg-gray">
                <SearchBar searchSetter={setBrowsedHouses}/>
            </div>
            <div>
                {browsedHouses.map(house => {
                    return <HouseCard title={house.title} description={house.description}/>
                })}
            </div>
        </>
    );
}

function HouseCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button variant="primary">See details</Button>
            </Card.Body>
        </Card>
    );
}