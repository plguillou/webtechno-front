import {Alert, Button, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {userSelector} from "../../utils/store/user/userSelector";
import {dateStringToLabel, toYYYYMMDD} from "../../utils/utils";
import {useEffect, useState} from "react";
import {acceptBooking, editBooking, getOtherPersonHousesList} from "../../utils/requests/bookings";

export default function EditBookingModal({show, onHide, booking, onAcceptClickOnReceivedBooking, update}) {
    const user = useSelector(userSelector);
    const [newDemand, setNewDemand] = useState({});
    let bookingFromUser;
    let bookingFromOther;

    // console.log("booking:", booking)
    // console.log(user)


    if (booking.id !== -1) {
        if (user.mail === booking.user1.mail) {
            bookingFromUser = {
                user: booking.user1, house: booking.houseWantedByUser1,
                startDate: booking.startDateHouse1, endDate: booking.endDateHouse1,
                isAccepted: booking.hasUser2Accepted
            }
            bookingFromOther = {
                user: booking.user2, house: booking.houseWantedByUser2,
                startDate: booking.startDateHouse2, endDate: booking.endDateHouse2,
                isAccepted: booking.hasUser1Accepted
            }
        } else {
            bookingFromUser = {
                user: booking.user2, house: booking.houseWantedByUser2,
                startDate: booking.startDateHouse2, endDate: booking.endDateHouse2,
                isAccepted: booking.hasUser1Accepted
            }
            bookingFromOther = {
                user: booking.user1, house: booking.houseWantedByUser1,
                startDate: booking.startDateHouse1, endDate: booking.endDateHouse1,
                isAccepted: booking.hasUser2Accepted
            }
        }
        bookingFromUser = {id: booking.id, ...bookingFromUser}
        bookingFromOther = {id: booking.id, ...bookingFromOther}
        if (bookingFromUser.id !== newDemand.id) setNewDemand(bookingFromUser)
    }


    function handleAcceptClick() {
        // console.log("accept", booking)
        if (booking.id === -1) return;
        acceptBooking(booking.id).then(() => update())
        // onHide()
    }

    const handleEditClick = (newDemand) => {
        // console.log("bookingid", booking)
        if (booking.id === -1) return;
        editBooking(booking.id, newDemand.startDate, newDemand.endDate, newDemand.house?.id).then(() => {
            update();
        })
    }

    // console.log("bookingFromOter", toYYYYMMDD(bookingFromOther?.startDate), toYYYYMMDD(bookingFromOther?.endDate))
    // console.log("bookingFromUser", toYYYYMMDD(bookingFromUser?.startDate), toYYYYMMDD(bookingFromUser?.endDate))



    return (
        <Modal
            show={show}
            onHide={onHide}
            size={"xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Négocier ou modifier le booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className={"container d-inline-flex justify-content-evenly py-2"}>

                    <BookDemandOther title={"Il demande"} bookingDemand={bookingFromOther}
                                     dateCorresponding={
                                         toYYYYMMDD(bookingFromUser?.startDate) === toYYYYMMDD(bookingFromOther?.startDate)
                                         && toYYYYMMDD(bookingFromUser?.endDate) === toYYYYMMDD(bookingFromOther?.endDate)}
                                     handleAccept={handleAcceptClick}
                    />

                    <div className={"border border-honey"} style={{width: 0}}/>

                    <BookDemand title={"Vous demandez"} bookingDemand={newDemand}
                                onCancelEdit={() => setNewDemand(bookingFromUser)}
                                onOkClick={() => handleEditClick(newDemand)}
                                setNewDemand={setNewDemand}/>

                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant={"secondary"}>Exit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const BookDemand = ({bookingDemand, setNewDemand, onOkClick, onCancelEdit, title}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [otherHouses, setOtherHouses] = useState([])
    useEffect(() => {
        if (bookingDemand.id && bookingDemand.id !== -1) getOtherPersonHousesList(bookingDemand.id).then(value => setOtherHouses(value));
    }, [bookingDemand.id])
    // console.log("otherHouses", otherHouses)
    // console.log("bookingDemand", bookingDemand)

    // console.log(bookingDemand.startDate && (new Date(bookingDemand.startDate)).toLocaleDateString("en-US"))
    // console.log(bookingDemand.startDate && (toYYYYMMDD(bookingDemand.startDate, "-")))

    return (
        <div className={"w-50 px-2 text-center"}>
            <div className={"d-flex justify-content-end"}>
                {isEditing ?
                    <>
                        <Button variant={"outline-success"} className={"me-1"}
                                onClick={() => {
                                    setIsEditing(false);
                                    onOkClick()
                                }}>
                            Sauvegarder
                        </Button>
                        <Button variant={"outline-secondary"}
                                onClick={() => {
                                    setIsEditing(false);
                                    onCancelEdit()
                                }}>
                            Annuler
                        </Button>
                    </>
                    :
                    <Button variant={"outline-primary"}
                            onClick={() => setIsEditing(true)}>
                        <i className={"bi-pencil"}/> Edit</Button>
                }
            </div>

            <h2>{title}</h2>
            <div className={"d-flex flex-column justify-content-center align-content-center"}>

                <div className={"d-inline-flex m-auto mb-2"}>
                    <div className={"mt-2"}>A accéder à la résidence :</div>

                    <DropdownButton variant={"gray"} title={bookingDemand?.house ? bookingDemand.house?.title : "House"}
                                    disabled={!isEditing}>
                        {otherHouses.map((elem, i) => (
                            <Dropdown.Item key={i} onClick={() => setNewDemand({...bookingDemand, house: elem})}>
                                {elem.title}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>

                <div className={"d-inline-flex m-auto mb-2"}>
                    <div className={"mt-1"}>du:</div>
                    <Form.Control
                        value={bookingDemand.startDate ? toYYYYMMDD(bookingDemand.startDate, "-") : ""}
                        onChange={(event) => (setNewDemand({...bookingDemand, startDate: event.target.value}))}
                        type="date" size={"sm"} className={"mx-1"} disabled={!isEditing}/>

                </div>

                <div className={"d-inline-flex m-auto mb-2"}>
                    <div className={"mt-1"}>au:</div>
                    <Form.Control
                        value={bookingDemand.endDate ? toYYYYMMDD(bookingDemand.endDate, "-") : ""}
                        onChange={(event) => setNewDemand({...bookingDemand, endDate: event.target.value})}
                        type="date" size={"sm"} className={"mx-1"} disabled={!isEditing}/>

                </div>
            </div>

            {bookingDemand?.isAccepted &&
            <Alert variant={"success"} className={"w-50 m-auto mt-2"}>Demande acceptée</Alert>}
        </div>
    )
}

const BookDemandOther = ({bookingDemand, title, dateCorresponding = false, handleAccept}) => {
    const isAcceptable = bookingDemand?.house && bookingDemand?.startDate && bookingDemand?.endDate && dateCorresponding;

    return (
        <div className={"w-50 px-2 text-center"}>
            <br/>
            <h2>{title}</h2>
            <div>
                <div className={"mt-2"}>
                    A accéder à la maison <b>{bookingDemand?.house?.title ||
                <span className={"text-muted"}>aucune résidence souhaitée</span>}</b>
                </div>

                <div className={"my-1"}>
                    du <b>{dateStringToLabel(bookingDemand?.startDate) ||
                <span className={"text-muted"}>pas de date</span>}</b>
                </div>

                <div className={"my-1"}>
                    au <b>{dateStringToLabel(bookingDemand?.endDate) ||
                <span className={"text-muted"}>pas de date</span>}</b>
                </div>
            </div>

            <div className={"d-flex justify-content-center mt-4"}>
                <Button size={"lg"} variant={"success"} disabled={!isAcceptable} onClick={handleAccept}>
                    Accepter sa demande
                </Button>
            </div>
            {!bookingDemand?.house &&
            <div className={"text-muted"}>Aucune résidence sélectionnée par l'utilisateur</div>}
            {(!bookingDemand?.endDate || !bookingDemand?.startDate) &&
            <div className={"text-muted"}>Dates sélectionnées par l'utilisateur non valides</div>}
            {!dateCorresponding &&
            <div className={"text-muted"}>Dates valides mais elle ne correspondent pas avec les vôtres</div>}

        </div>
    )
}
