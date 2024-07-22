import axios from "axios";
import apiInfo from "./apiInfo";

export default async function postApi(path, body){
    let response;

    await axios.post(apiInfo[path], {
        ...body
    })
    .then(Response => {
        response = Response;
    })
    .catch(err => {
        console.error(err);
        response = err;
    })

    return response;
}

