import magnifierIcon from "../../Resources/Icons/Magnifier.png";
import {useEffect, useState} from "react";
import {
    alertMsg, alertUser,
    areFieldsComplete, checkDatesPattern, isArrivalBeforeDeparture, isArrivalFuture,
    searchHouses,
    setArrivalDate,
    setDepartureDate,
    setLocation
} from "../utils/requests/browser";
import {Alert} from "react-bootstrap";

export default function SearchBar(props) {
    const [displayAlert, setDisplayAlert] = useState({display: "none"});

    useEffect(() => {
        if (alertUser) setDisplayAlert({display: "block"});
        else setDisplayAlert({display: "none"});
    },[]);

    return (
        <div>
            <form method="post" action="" onSubmit={(event) => {
                event.preventDefault();
                if (areFieldsComplete()) {
                    if (checkDatesPattern()) {
                        if (isArrivalFuture() && isArrivalBeforeDeparture()) {
                            searchHouses(props.searchSetter);
                        }
                    }
                }
            }}
                  className="d-flex justify-content-center align-items-center rounded-pill bg-white p-2">
                <BrowserField name="Lieu" type="text" placeholder="Where do you go?"
                              size={{minWidth: "210px", width: "18vw"}} setter={setLocation}/>
                <div className="border" style={{height: "30px"}}/>
                <BrowserField name="Arrivée" type="date" placeholder="When do you come?"
                              size={{minWidth: "150px", width: "11vw"}} setter={setArrivalDate}/>
                <div className="border" style={{height: "30px"}}/>
                <BrowserField name="Départ" type="date" placeholder="When do you leave?"
                              size={{minWidth: "150px", width: "11vw"}} setter={setDepartureDate}/>
                <input type="submit" value=" "
                       className="border-0 rounded-circle p-0 bg-pos-center"
                       style={{backgroundImage: "url(" + magnifierIcon + ")", width: "65px", height: "65px"}}/>
            </form>
            <Alert variant="danger" style={displayAlert}>
                {alertMsg}
            </Alert>
        </div>
    );
}

function BrowserField(props) {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className={"rounded-pill py-2 px-4 " + (isHovered ?  "bg-light" : "bg-white")}
             style={props.size}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
            <h4 className="m-0 fs-5 text-fogra29">{props.name}</h4>
            <input type={props.type} placeholder={props.placeholder} required
                   onChange={event => props.setter(event.target.value)}
                   className="border-0 fs-6 bg-transparent"/>
        </div>
    );
}
