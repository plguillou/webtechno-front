import {useEffect, useState} from "react";
import {Alert, Button, Spinner} from "react-bootstrap";
import {
    changeReceivedBookingState,
    changeSentBookingState,
    getBookings,
    getReceivedBookings,
    removeSentBooking
} from "../utils/requests/bookings";
import EditBookingModal from "../common/house/EditBookingModal";
import {dateStringToLabel} from "../utils/utils";

export default function Bookings() {
    const [is1Loading, setIs1Loading] = useState(true);
    const [is2Loading, setIs2Loading] = useState(true);
    const [editingBooking, setEditingBooking] = useState({id: -1});
    const [receivedBookings, setReceivedBookings] = useState([]);
    const [sentBookings, setSentBookings] = useState([]);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);
    const acceptedBookings = sentBookings?.filter(elem => elem.state === "ACCEPTED").map(elem => ({
        ...elem, isSent: true
    }))
        .concat(
            receivedBookings?.filter(elem => elem.state === "ACCEPTED").map(elem => ({
                ...elem, isSent: false
            }))
        );

    useEffect(() => {
        getBookings().then((data) => {
            setSentBookings(data);
            setIs1Loading(false)
        });
        getReceivedBookings().then((data) => {
            setReceivedBookings(data);
            setIs2Loading(false)
        });
    }, [updateValue])

    const onCancelClickOnSentBooking = (id) => {
        removeSentBooking(id).then(() => update())
    }

    const onRefuseClickOnReceivedBooking = (id) => {
        changeReceivedBookingState(id, "REFUSED").then(() => update())
    }

    const onMakeDisappearClickOnSentBooking = (id) => {
        changeSentBookingState(id, "ARCHIVED").then(() => update())
    }

    const onAcceptClickOnReceivedBooking = (id) => {
        changeReceivedBookingState(id, "ACCEPTED").then(() => update())
    }

    return <div className={"container mt-4"}>
        <h2 className={"text-center text-uppercase m-4"}>Vos réservations</h2>
        <div className={"d-flex align-content-center flex-column"}>
            {
                acceptedBookings && acceptedBookings.map((elem, i) => (
                    <Alert variant={"success"} key={i} className={"d-inline-flex m-auto my-2 p-2"}>
                        <div className={"m-1 pt-2"}>
                            Demande {elem.isSent ? <span>envoyé par <b>vous</b></span> :
                            <span>envoyé par <b>{elem.user1?.name}</b></span>} acceptée
                        </div>
                        <div className={"m-1 pt-2"}>pour la résidence "{elem.houseWantedByUser1?.title}"</div>
                        <div
                            className={"m-1 pt-2"}>du <b>{dateStringToLabel(elem.startDateHouse1)}</b> au <b>{dateStringToLabel(elem.endDateHouse1)}</b>
                        </div>
                    </Alert>))
            }
        </div>

        <div className={"container border border-gray rounded-2 my-2"}>
            <h2 className={"m-2"}>Les réservations que vous avez envoyés</h2>
            {
                is1Loading &&
                <div className={"d-flex justify-content-center m-4"}>
                    <Spinner animation={"border"} variant={"honey"}/>
                </div>
            }
            <div className={"d-flex align-content-center flex-column"}>
                {
                    sentBookings?.filter(elem => elem.state === "REFUSED").map((elem, i) => (
                        <Alert variant={"danger"} key={i}
                               className={"d-inline-flex border border-danger m-auto my-2 p-2"}>
                            <div className={"m-1 pt-2 text-danger"}><b>Demande annulé</b></div>
                            <div className={"m-1 pt-2"}>pour la résidence "{elem.houseWantedByUser1?.title}"</div>
                            <div
                                className={"m-1 pt-2"}>du <b>{dateStringToLabel(elem.startDateHouse1)}</b> au <b>{dateStringToLabel(elem.endDateHouse1)}</b>
                            </div>
                            <Button variant={"outline-danger"}
                                    onClick={() => onMakeDisappearClickOnSentBooking(elem.id)}
                                    className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                <b><i className={"bi-x text-size-3 py-0 my-0"}/></b>
                                <div className={"m-auto"}>Faire disparaitre</div>
                            </Button>
                        </Alert>))
                }
                <hr/>
                {
                    sentBookings?.filter(elem => elem.state !== "REFUSED").map((elem, i) => (
                        <div key={i} className={"d-inline-flex border border-honey m-auto my-2 p-2"}>
                            <div className={"m-1 pt-2"}>Demande de votre part</div>
                            <div className={"m-1 pt-2"}>pour la résidence "{elem.houseWantedByUser1?.title}"</div>
                            <div
                                className={"m-1 pt-2"}>du <b>{dateStringToLabel(elem.startDateHouse1)}</b> au <b>{dateStringToLabel(elem.endDateHouse1)}</b>
                            </div>
                            <div>
                                <Button variant={"outline-orange"}
                                        onClick={() => setEditingBooking(elem)}
                                        className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                    <b><i className={"bi-check2 text-size-3 py-0 my-0"}/></b>
                                    <div className={"m-auto"}>Négocier/Modifier</div>
                                </Button>
                                <Button variant={"outline-danger"}
                                        onClick={() => onCancelClickOnSentBooking(elem.id)}
                                        className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                    <b><i className={"bi-x text-size-3 py-0 my-0"}/></b>
                                    <div className={"m-auto"}>Annuler</div>
                                </Button>
                            </div>
                        </div>))
                }

            </div>
        </div>
        {/* *********** Les réservations que l'on vous a envoyés *******************/}
        <div className={"container border border-gray rounded-2 my-2"}>
            <h2 className={"m-2"}>Les réservations que l'on vous a envoyés</h2>
            {
                is2Loading &&
                <div className={"d-flex justify-content-center m-4"}>
                    <Spinner animation={"border"} variant={"honey"}/>
                </div>
            }
            <div className={"d-flex align-content-center flex-column"}>
                {
                    receivedBookings.filter(elem => elem.state !== "ACCEPTED").map((elem, i) => (
                        <div key={i}
                             className={"d-inline-flex border border-orange m-auto my-2 p-2"}>
                            <div className={"m-1 pt-2"}>Demande de <b>{elem.user1.name}</b></div>
                            <div className={"m-1 pt-2"}>pour la résidence "{elem.houseWantedByUser1.title}"</div>
                            <div className={"m-1 pt-2"}>
                                du <b>{dateStringToLabel(elem.startDateHouse1)}</b> au <b>{dateStringToLabel(elem.endDateHouse1)}</b>
                            </div>
                            <div>
                                <Button variant={"outline-orange"}
                                        onClick={() => setEditingBooking(elem)}
                                        className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                    <b><i className={"bi-check2 text-size-3 py-0 my-0"}/></b>
                                    <div className={"m-auto"}>Négocier/Modifier</div>
                                </Button>
                                <Button variant={"outline-danger"}
                                        onClick={() => onRefuseClickOnReceivedBooking(elem.id)}
                                        className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                    <b><i className={"bi-x text-size-3 py-0 my-0"}/></b>
                                    <div className={"m-auto"}>Refuser</div>
                                </Button>
                            </div>
                        </div>))
                }
            </div>
        </div>
        <EditBookingModal show={editingBooking.id > -1} booking={editingBooking}
                          onHide={() => setEditingBooking({id: -1})}
                          onAcceptClickOnReceivedBooking={onAcceptClickOnReceivedBooking}/>

    </div>
}


