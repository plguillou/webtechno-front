import "../../Styles/HomeStyle.css";

export default function Home() {
    return (
        <>
            <HookSection/>
        </>
    );
}

function HookSection(props) {
    return (
        <div className="d-flex justify-content-center align-items-center"
             style={{height: "90vh", backgroundPosition: "center"}}
             id="hookSection">
            <div className="d-flex justify-content-center align-items-center w-75"
                 style={{backgroundColor: "rgba(196, 196, 196, 0.25)", backdropFilter: "blur(4px)", borderRadius: "10px"}}>
                <h1 className="text-center lh-base"
                    style={{fontSize: "4.6em", color: "#010D14", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                    Browse among hundreds of housings and book the one of your dreams!
                </h1>
            </div>
        </div>
    );
}