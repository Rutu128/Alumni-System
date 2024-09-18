import FollowRequests from "./Notifications/FollowRequests";

export default function Notifications() {
    return (
        <main className="notification">
            <div className="notification__cont">
                <section className="notification__head">
                    <h1>Notifications</h1>
                </section>
                <section className="notification__body">
                    <div className="notification__body--cont">
                        <section className="notification__body--follow-requests">
                            <FollowRequests /> 
                        </section>
                        <section className="notification__body--user-requests">

                        </section>
                    </div>
                </section>
            </div>
        </main>
    )
}