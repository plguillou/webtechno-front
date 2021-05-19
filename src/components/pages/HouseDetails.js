import {getHouseDetails, modifyHouseDetails} from "../utils/requests/houses";
import {useEffect, useState, forwardRef, Children} from "react";
import {useParams} from "react-router-dom";
import {Button, Dropdown, FormControl} from "react-bootstrap";

function HouseDetails() {
    let {id} = useParams();
    const [isEditingHouse, setIsEditingHouse] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

    const [house, setHouse] = useState([]);
    let [newTitle, setNewTitle] = useState("");
    let [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        getHouseDetails(id, setHouse)
    }, [updateValue]);

    useEffect(() => {
        setNewTitle(house?.title)
        setNewDescription(house?.description)
    }, [house])

    const handleCancelClick = () => {
        setNewTitle(house?.title);
        setNewDescription(house?.description);
        setIsEditingHouse(false);
    }

    const handleOkClick = () => {
        modifyHouseDetails(id, newTitle, newDescription, update);
    }


    return <>
        <h1>Details de la house {id}</h1>
        <Button onClick={() => setIsEditingHouse(!isEditingHouse)}>Click here to edit toggle</Button>
        <div className={"container"}>
            <div className={"container-fluid"}>
                <div>Titre de votre résidence :</div>
                <div className={"m-auto"}>
                    <input className={"border bg-light text-fogra29"} value={newTitle}
                           disabled={!isEditingHouse} onChange={(e) => setNewTitle(e.target.value)}/>
                </div>
            </div>
            <br/>
            <div className={"container-fluid"}>
                <div>Description de votre résidence :</div>
                <div className={"m-auto"}>
                    <input className={"border bg-light text-fogra29"} value={newDescription}
                           disabled={!isEditingHouse} onChange={(e) => setNewDescription(e.target.value)}/>
                </div>
            </div>
            <DropdownCustom items={house.constraints}/>
            {/* todo faire une fonction utils qui
                param : listeSelected, listNotSelected
                out: newlisteSelected, newlisteNotSelected -> setter pour les listes en param
                print: list selected sous form de liste de chimp, print les not selected dans un menu deroulant
            */}

            <div>
                {
                    isEditingHouse && <div>
                        <Button variant={"outline-success"} onClick={handleOkClick}>OK</Button>
                        <Button variant={"outline-secondary"} onClick={handleCancelClick}>Cancel</Button>
                    </div>
                }
            </div>
        </div>
    </>
}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef(({children, onClick}, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));


// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                <FormControl autoFocus className="mx-3 my-2 w-auto" placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

function DropdownCustom({items}) {
    return <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Custom toggle
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
            {items?.map((elem, i) => (
                <Dropdown.Item eventKey={i}>{elem.title}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
}

export default HouseDetails;
