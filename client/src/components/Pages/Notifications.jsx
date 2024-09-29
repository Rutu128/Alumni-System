import { useContext, useEffect } from "react";
import FollowRequests from "./Notifications/FollowRequests";
import { GlobalContext } from "../../context/GlobalContext";

import "../../sass/pages/_notifications.scss";

export default function Notifications() {

    const { setSelectedMenu } = useContext(GlobalContext);
    
    useEffect(() => {
        setSelectedMenu('Notifications');
    }, [])

    return (
        <main className="notification">
            <div className="notification__cont">
                <section className="notification__head heading-primary-dark">
                    <h1>Notifications</h1>
                </section>
                <section className="notification__body">
                    <div className="notification__body--cont">
                        <section className="notification__body--follow-requests">
                            <FollowRequests /> 
                        </section>
                        <section className="notification__body--user-requests">
                            {/* <UserRe */}
                        </section>
                    </div>
                </section>
            </div>
        </main>
    )
}