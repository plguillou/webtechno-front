import {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {getBookings} from "../utils/requests/bookings";

export default function Bookings() {
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        getBookings().then((data) => {
            console.log(data)
            setBookings(data)
            setIsLoading(false)
        });
    },[])



    return <div className={"container mt-4"}>
        <h2 className={"text-center text-uppercase"}>Vos réservations</h2>
        <div className={"container border border-gray rounded-2 my-2"}>
            <h2 className={"m-2"}>Les réservations que vous avez envoyés</h2>
            {
                isLoading &&
                <div className={"d-flex justify-content-center m-4"}><Spinner animation={"border"} variant={"honey"}
                                                                              className={""}/></div>
            }
        </div>
        <div className={"container border border-gray rounded-2 my-2"}>
            <h2 className={"m-2"}>Les réservations que l'on vous a envoyés</h2>
            {
                isLoading &&
                <div className={"d-flex justify-content-center m-4"}><Spinner animation={"border"} variant={"honey"}
                                                                              className={""}/></div>
            }
        </div>

        {JSON.stringify(bookings)}
    </div>
}