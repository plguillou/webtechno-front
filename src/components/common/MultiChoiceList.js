import {Dropdown} from "react-bootstrap";

const MultiChoiceList = ({title, listSelected = [], listTotal = [], onSelect = function(){}}) => {

    const onItemSelect = (item) => {
        if(listSelected.map(elem => elem.id).includes(item.id)) return;
        onSelect(item);
    }

    return <Dropdown className={"m-2 p-2"}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {
                listTotal.map((elem, i) => (
                    <Dropdown.Item key={i} eventKey={elem.id}
                                   active={listSelected.map(selectElem => selectElem.id).includes(elem.id)}
                                   onSelect={(eventKey, e) => onItemSelect(elem)}
                    >
                        {elem.title}
                    </Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
    </Dropdown>
}

export default MultiChoiceList;