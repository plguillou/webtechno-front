import SearchBar from "./SearchBar";
import {Button, Card} from "react-bootstrap";

export default function Browser() {
    return(
        <>
            <div className="d-flex justify-content-center align-items-center py-5 bg-gray">
                <SearchBar/>
            </div>
            <div>

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
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">See details</Button>
            </Card.Body>
        </Card>
    );
}