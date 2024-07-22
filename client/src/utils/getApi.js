import apiInfo from "./apiInfo";
import axios from "axios";


export default async function getApi(path, parameters){
    await axios.get(apiInfo[path], {
        ...parameters
    })
    .then(Response => {
        return Response;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}