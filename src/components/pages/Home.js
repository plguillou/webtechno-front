import "../../Styles/HomeStyle.css";
import downArrowIconPath from "../../Resources/Icons/down-arrow.png";
import magnifierIcon from "../../Resources/Icons/Magnifier.png";
import playBtnIcon from "../../Resources/Icons/play-button.png";
import {useState} from "react";

export default function Home() {
    return (
        <>
            <HookSection/>
            <PresentationSection/>
            <BrowserSection/>
            <HostPresentationSection/>
        </>
    );
}

function HookSection(props) {
    return (
        <div className="d-flex justify-content-center align-items-center"
             style={{height: "92vh", backgroundPosition: "center"}}
             id="hookSection">
            <div className="d-flex justify-content-center align-items-center w-75"
                 style={{backgroundColor: "rgba(196, 196, 196, 0.25)", backdropFilter: "blur(4px)", borderRadius: "10px"}}>
                <h2 className="text-center lh-base"
                    style={{fontSize: "4.6em", color: "#010D14", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                    Browse among hundreds of housings and book the one of your dreams!
                </h2>
            </div>
        </div>
    );
}

function PresentationSection(props) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4"
             style={{minHeight: "92vh", backgroundColor: "#023047"}}>
            <div className="d-flex flex-column justify-content-center align-items-center w-75">
                <h1 className="text-center lh-base p-3 mt-5"
                    style={{fontSize: "5em", color: "#FFB703"}}>
                    Home Exchange Manager
                </h1>
                <p className="text-center lh-base fs-1 pb-3 mb-4" style={{color: "#8ECAE6"}}>
                    indexes <em className="fst-normal" style={{color: "#FFB703"}}>hundreds of housings</em>,
                    owned by private individuals, that you can book for a night
                    to a few weeks.
                </p>
                <p className="text-center lh-base fs-1 pt-3 mt-4" style={{color: "#8ECAE6"}}>
                    You are looking for your dream vacation house, or just for a place to sleep during your exam week?
                </p>
                <a href="#browserSection" className="text-center text-decoration-none">
                    <p className="text-center lh-base fs-1" style={{color: "#FB8500"}}>
                        Stop bothering, start browsing!
                    </p>
                    <div className="p-4 my-4">
                        <img src={downArrowIconPath} alt="Icon showing an arrow pointing downwards"
                              style={{width: "8vw"}}/>
                    </div>
                </a>
            </div>
        </div>
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

function BrowserSection(props) {
    return(
        <div id="browserSection" className="d-flex justify-content-center align-items-center"
             style={{minHeight: "100vh", backgroundPosition: "center"}}>
            <form className="d-flex justify-content-center align-items-center rounded-pill bg-white p-2">
                <BrowserField name="Location" placeholder="Where do you go?"/>
                <div className="border" style={{height: "30px"}}/>
                <BrowserField name="Arrival" placeholder="When do you come?"/>
                <div className="border" style={{height: "30px"}}/>
                <BrowserField name="Departure" placeholder="When do you leave?"/>
                <input type="submit" value=" "
                       className="border-0 rounded-circle p-0"
                       style={{backgroundImage: "url("+magnifierIcon+")", backgroundPosition:"center", width: "65px", height: "65px"}}/>
            </form>
        </div>
    );
}

function HostPresentationSection(props) {
    return(
        <div className="d-flex justify-content-center align-items-center p-4"
             style={{backgroundColor: "#8ECAE6"}}>
            <div className="d-flex flex-column justify-content-center align-items-center w-75">
                <p className="text-center lh-base fs-1 py-3 mt-5" style={{color: "#010D14"}}>
                    You own a housing and aren’t using it currently?
                </p>
                <h4 className="text-center lh-base py-4" style={{fontSize: "4.6em", color: "#FB8500"}}>
                    Register as a host and make some money!
                </h4>
                <div className="d-flex justify-content-center align-items-center pt-3 pb-4 mb-5">
                    <p className="text-center lh-base fs-1" style={{color: "#010D14"}}>
                        Start hosting now
                    </p>
                    <img src={playBtnIcon} alt="Play button" className="mx-4"
                         style={{width: "80px"}}/>
                </div>
            </div>
        </div>
    );
}
