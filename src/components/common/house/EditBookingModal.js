import {Button, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {userSelector} from "../../utils/store/user/userSelector";
import {dateStringToLabel, toYYYYMMDD} from "../../utils/utils";
import {useEffect, useState} from "react";
import {getOtherPersonHousesList} from "../../utils/requests/bookings";

export default function EditBookingModal({show, onHide, booking, onAcceptClickOnReceivedBooking}) {
    const user = useSelector(userSelector);
    const [newDemand, setNewDemand] = useState({});
    console.log(booking)
    // console.log(user)

    let bookingFromUser;
    let bookingFromOther;
    if (booking.id !== -1) {
        if (user.mail === booking.user1.mail) {
            bookingFromUser = {
                user: booking.user1, house: booking.houseWantedByUser1,
                startDate: booking.startDateHouse1, endDate: booking.endDateHouse1
            }
            bookingFromOther = {
                user: booking.user2, house: booking.houseWantedByUser2,
                startDate: booking.startDateHouse2, endDate: booking.endDateHouse2
            }
        } else {
            bookingFromUser = {
                user: booking.user2, house: booking.houseWantedByUser2,
                startDate: booking.startDateHouse2, endDate: booking.endDateHouse2
            }
            bookingFromOther = {
                user: booking.user1, house: booking.houseWantedByUser1,
                startDate: booking.startDateHouse1, endDate: booking.endDateHouse1
            }
        }
        bookingFromUser = {id: booking.id, ...bookingFromUser}
        bookingFromOther = {id: booking.id, ...bookingFromOther}
        if(bookingFromUser.id !== newDemand.id) setNewDemand(bookingFromUser)
    }




    function handleEditClick() {
        onAcceptClickOnReceivedBooking(booking)
        onHide()
    }

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


                <h1 className={"text-gray text-center"}>WORK IN PROGRESS</h1>
                <div className={"container d-inline-flex justify-content-evenly py-2"}>

                    <BookDemandOther title={"Il demande"} bookingDemand={bookingFromOther}/>

                    <div className={"border border-honey"} style={{width: 0}}/>

                    <BookDemand title={"Vous demandez"} bookingDemand={newDemand} isEditable={true}
                                setNewDemand={setNewDemand}/>

                </div>
                <div className={"d-flex justify-content-center mt-4"}>
                    <Button size={"lg"} onClick={handleEditClick} variant={"success"}>
                        Accepter la demande
                    </Button>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant={"secondary"}>Exit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const BookDemand = ({bookingDemand, setNewDemand, title}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [otherHouses, setOtherHouses] = useState([])
    useEffect(() => {
        if(bookingDemand.id && bookingDemand.id !== -1) getOtherPersonHousesList(bookingDemand.id).then(value => setOtherHouses(value));
    }, [bookingDemand.id])
    console.log("otherHouses", otherHouses)
    console.log("bookingDemand", bookingDemand)

    // console.log(bookingDemand.startDate && (new Date(bookingDemand.startDate)).toLocaleDateString("en-US"))
    // console.log(bookingDemand.startDate && (toYYYYMMDD(bookingDemand.startDate, "-")))

    return (
        <div className={"w-50 px-2 text-center"}>
            <div className={"d-flex justify-content-end"}>
                {isEditing ?
                    <>
                        <Button variant={"outline-success"} className={"me-1"}
                                onClick={() => setIsEditing(false)}>
                            Sauvegarder
                        </Button>
                        <Button variant={"outline-secondary"}
                                onClick={() => setIsEditing(false)}>
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

                    <DropdownButton variant={"gray"} title={bookingDemand?.house ? bookingDemand.house?.title : "House"} disabled={!isEditing}>
                        {otherHouses.map((elem, i) => (
                            <Dropdown.Item key={i} onClick={() => setNewDemand({...bookingDemand, house:elem})}>
                                {elem.title}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>

                <div className={"d-inline-flex m-auto mb-2"}>
                    <div className={"mt-1"}>du:</div>
                    <Form.Control
                        value={bookingDemand.startDate ? toYYYYMMDD(bookingDemand.startDate, "-") : toYYYYMMDD("", "-")}
                        onChange={(event) => (console.log(event.target.value))}
                        type="date" size={"sm"} className={"mx-1"} disabled={!isEditing}/>

                </div>

                <div className={"d-inline-flex m-auto mb-2"}>
                    <div className={"mt-1"}>au:</div>
                    <Form.Control
                        value={bookingDemand.startDate ? toYYYYMMDD(bookingDemand.endDate, "-") : toYYYYMMDD("", "-")}
                        onChange={(event) => (console.log(event.target.value))}
                        type="date" size={"sm"} className={"mx-1"} disabled={!isEditing}/>

                </div>
            </div>

        </div>
    )
}

const BookDemandOther = ({bookingDemand, title}) => {

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

        </div>
    )
}
