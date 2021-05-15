import "../../Styles/HomeStyle.css";
import downArrowIconPath from "../../Resources/Icons/down-arrow.png";
import magnifierIcon from "../../Resources/Icons/Magnifier.png";

export default function Home() {
    return (
        <>
            <HookSection/>
            <PresentationSection/>
            <BrowserSection/>
        </>
    );
}

function HookSection(props) {
    return (
        <div className="d-flex justify-content-center align-items-center"
             style={{height: "92vh", backgroundPosition: "center"}}
             id="hookSection">
            <div className="d-flex justify-content-center align-items-center w-75"
                 style={{backgroundColor: "rgba(196, 196, 196, 0.25)", backdropFilter: "blur(4px)", borderRadius: "10px"}}> {/* TODO: try bootstrap class rounded-<nb> */}
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
             style={{height: "92vh", backgroundColor: "#023047"}}>
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
                <a href="#searchBar" className="text-center text-decoration-none">
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
    return(
        <div className="rounded-pill py-2 px-4" style={{minWidth: "210px", width: "18vw"}}>
            <h4 className="m-0 fs-5">{props.name}</h4>
            <input type="text" name={props.name} placeholder={props.placeholder}
                   className="border-0 fs-6"/>
        </div>
    );
}

function BrowserSection(props) {
    return(
        <div id="browserSection" className="d-flex justify-content-center align-items-center"
             style={{height: "92vh", backgroundPosition: "center"}}>
            <form id="searchBar">
                <BrowserField name="Location" placeholder="Where do you go?"/>
                <BrowserField name="Arrival" placeholder="When do you come?"/>
                <BrowserField name="Departure" placeholder="When do you leave?"/>
                <input type="submit" value=" "
                       className="border-0 rounded-circle"
                       style={{backgroundImage: "url("+magnifierIcon+")", backgroundPosition:"center", width: "65px", height: "65px"}}/>
            </form>
        </div>
    );
}