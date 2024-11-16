import apiInfo from "./apiInfo";
import axios from "axios";

async function putApi(path, data, parameters = {}) {
    axios.defaults.withCredentials = true;
    let response;
    await axios.put(apiInfo.URL + path, data, {
        ...parameters,
        withCredentials: true,
    })
    .then(Response => {
        response = Response;
    })
    .catch(err => {
        console.log(err);
        response = err;
    });
    return response;
}

export default putApi;
