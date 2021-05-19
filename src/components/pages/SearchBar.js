import magnifierIcon from "../../Resources/Icons/Magnifier.png";
import {useState} from "react";

export default function SearchBar() {
    return (
        <form className="d-flex justify-content-center align-items-center rounded-pill bg-white p-2">
            <BrowserField name="Location" placeholder="Where do you go?"/>
            <div className="border" style={{height: "30px"}}/>
            <BrowserField name="Arrival" placeholder="When do you come?"/>
            <div className="border" style={{height: "30px"}}/>
            <BrowserField name="Departure" placeholder="When do you leave?"/>
            <input type="submit" value=" "
                   className="border-0 rounded-circle p-0 bg-pos-center"
                   style={{backgroundImage: "url("+magnifierIcon+")", width: "65px", height: "65px"}}/>
        </form>
    );
}

function BrowserField(props) {
    let [isHovered, setIsHovered] = useState(false);

    return(
        <div className={"rounded-pill py-2 px-4 " + (isHovered ?  "bg-light" : "bg-white")}
             style={{minWidth: "210px", width: "18vw"}}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
            <h4 className="m-0 fs-5">{props.name}</h4>
            <input type="text" name={props.name} placeholder={props.placeholder}
                   className="border-0 fs-6 bg-transparent"/>
        </div>
    );
}