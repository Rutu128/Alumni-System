import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/UserContext";

export default function FollowRequests() {
    const [followRequests, setFollowRequests] = useState([]);

    const { getFollowRequests } = useContext(UserContext);

    useEffect(() => {
        async function fetchRequests(){
            const data = await getFollowRequests();
            console.log(data);
            setFollowRequests(data);
        }
        fetchRequests();
    }, []);

    return (
        <div className="follow-requests">
            
        </div>
    )
}
