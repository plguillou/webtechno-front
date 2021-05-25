import {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {getBookings, getReceivedBookings} from "../utils/requests/bookings";

export default function Bookings() {
    const [isLoading, setIsLoading] = useState(true);
    const [receivedBookings, setReceivedBookings] = useState([]);
    const [sentBookings, setSentBookings] = useState([]);
    useEffect(() => {
        getBookings().then((data) => {
            console.log("sent", data)
            setSentBookings(data);
        });
        getReceivedBookings().then((data) => {
            console.log("received", data)
            setReceivedBookings(data);
        });
    }, [])


    return <div className={"container mt-4"}>
        <h2 className={"text-center text-uppercase"}>Vos réservations</h2>
        <div className={"container border border-gray rounded-2 my-2"}>
            <h2 className={"m-2"}>Les réservations que vous avez envoyés</h2>
            {
                isLoading &&
                <div className={"d-flex justify-content-center m-4"}>
                    <Spinner animation={"border"} variant={"honey"}/>
                </div>
            }
            <div>
                {sentBookings.map((elem, i) => <div key={i} className={"d-inline-flex border border-light m-2"}>
                    <div className={"m-1"}>Demande de &lt;todo&gt;</div>
                    <div className={"m-1"}>Pour la maison &lt;todo&gt;</div>
                    <div className={"m-1"}>Du {elem.startDate} au {elem.endDate}</div>
                </div>)}
            </div>
        </div>
        <div className={"container border border-gray rounded-2 my-2"}>
            <h2 className={"m-2"}>Les réservations que l'on vous a envoyés</h2>
            {
                isLoading &&
                <div className={"d-flex justify-content-center m-4"}>
                    <Spinner animation={"border"} variant={"honey"}/>
                </div>
            }
            <div>
                {JSON.stringify(receivedBookings)}
            </div>
        </div>


    </div>
}