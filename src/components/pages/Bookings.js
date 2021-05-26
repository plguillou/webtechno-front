import {useEffect, useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import {getBookings, getReceivedBookings, removeSentBooking} from "../utils/requests/bookings";

export default function Bookings() {
    const [is1Loading, setIs1Loading] = useState(true);
    const [is2Loading, setIs2Loading] = useState(true);
    const [receivedBookings, setReceivedBookings] = useState([]);
    const [sentBookings, setSentBookings] = useState([]);
    const [updateValue, setUpdateValue] = useState(false);
    const update = () => setUpdateValue(updateValue + 1);

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


    return <div className={"container mt-4"}>
        <h2 className={"text-center text-uppercase m-4"}>Vos réservations</h2>
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
                    sentBookings.map((elem, i) => <div key={i}
                                                       className={"d-inline-flex border border-honey m-auto my-2 p-2"}>
                        <div className={"m-1 pt-2"}>Demande de votre part</div>
                        <div className={"m-1 pt-2"}>pour la résidence "{elem.house.title}"</div>
                        <div
                            className={"m-1 pt-2"}>du <b>{dateStringToLabel(elem.startDate)}</b> au <b>{dateStringToLabel(elem.endDate)}</b>
                        </div>
                        <Button variant={"outline-danger"}
                                onClick={() => onCancelClickOnSentBooking(elem.id)}
                                className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                            <b><i className={"bi-x text-size-3 py-0 my-0"}/></b>
                            <div className={"m-auto"}>Annuler</div>
                        </Button>
                    </div>)
                }
            </div>
        </div>
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
                    receivedBookings.map((elem, i) => <div key={i}
                                                           className={"d-inline-flex border border-orange m-auto my-2 p-2"}>
                        <div className={"m-1 pt-2"}>Demande de <b>{elem.user.name}</b></div>
                        <div className={"m-1 pt-2"}>pour la résidence "{elem.house.title}"</div>
                        <div className={"m-1 pt-2"}>
                            du <b>{dateStringToLabel(elem.startDate)}</b> au <b>{dateStringToLabel(elem.endDate)}</b>
                        </div>
                        <div>
                            <Button variant={"outline-orange"}
                                    className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                <b><i className={"bi-check2 text-size-3 py-0 my-0"}/></b>
                                <div className={"m-auto"}>Accepter</div>
                            </Button>
                            <Button variant={"outline-danger"}
                                    className={"px-2 py-0 h-auto mx-2 rounded d-inline-flex align-content-center"}>
                                <b><i className={"bi-x text-size-3 py-0 my-0"}/></b>
                                <div className={"m-auto"}>Refuser</div>
                            </Button>
                        </div>
                    </div>)
                }
            </div>
        </div>

    </div>
}

const dateStringToLabel = (dateString) => {
    const date = new Date(dateString);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}