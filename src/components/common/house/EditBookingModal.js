import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {userSelector} from "../../utils/store/user/userSelector";
import {dateStringToLabel} from "../../utils/utils";

export default function EditBookingModal({show, onHide, booking, onAcceptClickOnReceivedBooking}) {
    const user = useSelector(userSelector);
    console.log(booking)
    console.log(user)
    if (booking.id === -1) return <div/>;

    let bookingFromUser;
    let bookingFromOther;
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

                    <BookDemand title={"Il demande"} bookingDemand={bookingFromOther} isEditable={false} />

                    <div className={"border border-honey"} style={{width: 0}}/>

                    <BookDemand title={"Vous demandez"} bookingDemand={bookingFromUser} isEditable={true} />

                </div>
                <div className={"d-flex justify-content-center mt-4"}>
                    <Button size={"lg"} onClick={handleEditClick} variant={"success"}>Accepter la
                        demande </Button>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant={"secondary"}>Exit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const BookDemand = ({bookingDemand, title, isEditable}) => (
    <div className={"w-50 px-2 text-center"}>
        <h2>{title}</h2>
        <div>
            <div>
                Accéder à la maison <b>{bookingDemand.house?.title ||
            <span className={"text-muted"}>aucune résidence souhaitée</span>}</b>
                <span className={"text-size-2"}>{isEditable && <><i className={"bi-check"}/> <i className="bi-x"/></>}</span>
            </div>
            <div>
                du <b>{dateStringToLabel(bookingDemand.startDate) ||
            <span className={"text-muted"}>pas de date</span>}</b>
            </div>
            <div>
                au <b>{dateStringToLabel(bookingDemand.endDate) ||
            <span className={"text-muted"}>pas de date</span>}</b>
            </div>
        </div>
    </div>
)
