import magnifierIcon from "../../Resources/Icons/Magnifier.png";
import {useState} from "react";
import {searchHouses} from "../utils/requests/browser";

export default function SearchBar(props) {
    let location = "";
    const setLocation = (value) => {location = value};
    let arrivalDate = "";
    const setArrivalDate = (value) => {arrivalDate = value};
    let departureDate = "";
    const setDepartureDate = (value) => {departureDate = value};

    return (
        <form method="post" action="" onSubmit={(event) => {
            event.preventDefault();
            searchHouses(props.searchSetter, location, arrivalDate, departureDate);
        }}
              className="d-flex justify-content-center align-items-center rounded-pill bg-white p-2">
            <BrowserField name="Location" type="text" placeholder="Where do you go?" setter={setLocation}/>
            <div className="border" style={{height: "30px"}}/>
            <BrowserField name="Arrival" type="date" placeholder="When do you come?" setter={setArrivalDate}/>
            <div className="border" style={{height: "30px"}}/>
            <BrowserField name="Departure" type="date" placeholder="When do you leave?" setter={setDepartureDate}/>
            <input type="submit" value=" "
                   className="border-0 rounded-circle p-0 bg-pos-center"
                   style={{backgroundImage: "url("+magnifierIcon+")", width: "65px", height: "65px"}}/>
        </form>
    );
}

function BrowserField(props) {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className={"rounded-pill py-2 px-4 " + (isHovered ?  "bg-light" : "bg-white")}
             style={{minWidth: "210px", width: "18vw"}}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
            <h4 className="m-0 fs-5">{props.name}</h4>
            <input type={props.type} placeholder={props.placeholder} required
                   onChange={event => props.setter(event.target.value)}
                   className="border-0 fs-6 bg-transparent"/>
        </div>
    );
}