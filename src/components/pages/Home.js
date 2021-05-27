import "../../Styles/HomeStyle.css";
import downArrowIconPath from "../../Resources/Icons/down-arrow.png";
import playBtnIcon from "../../Resources/Icons/play-button.png";
import SearchBar from "./SearchBar";

export default function Home() {
    return (
        <div id="home">
            <HookSection/>
            <PresentationSection/>
            <BrowserSection/>
            <HostPresentationSection/>
        </div>
    );
}

function HookSection(props) {
    return (
        <div className="d-flex justify-content-center align-items-center bg-pos-center"
             style={{height: "95vh"}}
             id="hookSection">
            <div className="d-flex justify-content-center align-items-center w-75"
                 style={{backgroundColor: "rgba(196, 196, 196, 0.25)", backdropFilter: "blur(4px)", borderRadius: "10px"}}>
                <h2 className="text-center lh-base text-fogra29"
                    style={{fontSize: "4.6em", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                    Browse among hundreds of housings and book the one of your dreams!
                </h2>
            </div>
        </div>
    );
}

function PresentationSection(props) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 bg-prussian"
             style={{minHeight: "95vh"}}>
            <div className="d-flex flex-column justify-content-center align-items-center w-75">
                <h1 className="text-center lh-base p-3 mt-5 text-honey"
                    style={{fontSize: "5em"}}>
                    Home Exchange Manager
                </h1>
                <p className="text-center lh-base fs-1 pb-3 mb-4 text-cornflower">
                    indexes <em className="fst-normal text-honey">hundreds of housings</em>,
                    owned by private individuals, that you can book for a night
                    to a few weeks.
                </p>
                <p className="text-center lh-base fs-1 pt-3 mt-4 text-cornflower">
                    You are looking for your dream vacation house, or just for a place to sleep during your exam week?
                </p>
                <div href="#browserSection" className="text-center text-decoration-none">
                    <p className="text-center lh-base fs-1 text-orange">
                        Stop bothering, start browsing!
                    </p>
                    <div className="p-4 my-4">
                        <img src={downArrowIconPath} alt="Icon showing an arrow pointing downwards"
                              style={{width: "8vw"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BrowserSection(props) {
    return(
        <div id="browserSection" className="d-flex justify-content-center align-items-center bg-pos-center"
             style={{minHeight: "100vh"}}>
            <SearchBar/>
        </div>
    );
}

function HostPresentationSection(props) {
    return(
        <div className="d-flex justify-content-center align-items-center p-4 bg-gray">
            <div className="d-flex flex-column justify-content-center align-items-center w-75">
                <p className="text-center lh-base fs-1 py-3 mt-5 text-fogra29">
                    You own a housing and aren’t using it currently?
                </p>
                <h4 className="text-center lh-base py-4 text-orange" style={{fontSize: "4.6em"}}>
                    Register as a host and make some money!
                </h4>
                <div className="d-flex justify-content-center align-items-center pt-3 pb-4 mb-5">
                    <p className="text-center lh-base fs-1 text-fogra29">
                        Start hosting now
                    </p>
                    <img src={playBtnIcon} alt="Play button" className="mx-4"
                         style={{width: "80px"}}/>
                </div>
            </div>
        </div>
    );
}
