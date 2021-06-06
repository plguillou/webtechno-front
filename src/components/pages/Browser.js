import SearchBar from "./SearchBar";
import {Button, Card} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {GET_HOUSE_PICTURE_URL} from "../utils/Urls";

export default function Browser() {
    const [browsedHouses, setBrowsedHouses] = useState([]);

    return(
        <>
            <div className="d-flex justify-content-center align-items-center py-5 bg-gray">
                <SearchBar searchSetter={setBrowsedHouses}/>
            </div>
            <div className="d-flex justify-content-evenly align-items-center flex-wrap bg-light py-4">
                {browsedHouses.map(house => {
                    return <HouseCard key={house.id} house={house}/>
                })}
            </div>
        </>
    );
}

function HouseCard(props) {
    const pictures = props.house.pictures;
    const photoPath = (pictures.length > 0)?
        ((pictures[0].fromInternet)? pictures[0].url : (GET_HOUSE_PICTURE_URL + "/" + pictures[0].url))
        : "";

    return (
        <Card style={{ width: '20rem', height: '31rem' }} className="m-3">
            <Card.Img variant="top" src={photoPath}
                      style={{maxWidth: "20rem", maxHeight: "20rem", width: "auto", height: "auto"}}/>
            <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <Card.Title className="fs-3 text-center mb-3">{props.house.title}</Card.Title>
                    <Card.Text>
                        {props.house.description}
                    </Card.Text>
                </div>
                <Link to={"/house-details/" + props.house.id} className="mb-3">
                    <Button variant="primary">See details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}
