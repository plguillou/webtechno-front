import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import MultiChoiceList from "../MultiChoiceList";

export default function HouseAttributeListAndEdit ({
                                       labelTitle,
                                       attributeName,
                                       newAttributes,
                                       allAttributes,
                                       isEditing,
                                       setNewAttributes
                                   }) {

    return <div className={"container-fluid"}>
        <div className={"mb-1"}>{labelTitle} :</div>
        <div className={"container d-block"}>
            {newAttributes?.map((elem, i) => (
                <div key={i}>

                    <div className={"btn mt-1 border border-1 text-dark bg-gray rounded-10 rounded-pill"}
                         key={i}
                    >
                        {elem.title}
                        {isEditing &&
                        <Button variant={"outline-dark"} size={"sm"}
                                className={"rounded-circle border-dark border ms-2  px-1 py-0"}
                                onClick={() => {
                                    setNewAttributes(newAttributes.filter(e => e.id !== elem.id))
                                }}
                        >
                            <OverlayTrigger
                                key={"click-to-remove"}
                                placement={"right"}
                                overlay={
                                    <Tooltip id={"tooltip-click-to-remove"}>
                                        Click to remove
                                    </Tooltip>
                                }>
                                <i className="bi bi-x"/>
                            </OverlayTrigger>
                        </Button>
                        }
                    </div>


                </div>
            ))}
        </div>
        {isEditing && <MultiChoiceList listSelected={newAttributes}
                                       listTotal={allAttributes}
                                       onSelect={(item) => setNewAttributes([item, ...newAttributes])}
                                       title={"Liste des " + attributeName}
        />}
    </div>
}