import axios from "axios";
import {SIGNIN_URL} from "../Urls";

export const attemptSignin = async (name, password, mail ) => {
    const data = new FormData();
    data.set("name", name);
    data.set("password", password);
    data.set("mail", mail);
    let error = false;
    const response = (await axios.post(SIGNIN_URL, data).catch(reason => error = reason.response));
    // console.log(response)
    return {data: response.data, error: error}
}
