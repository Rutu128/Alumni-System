import { useLocation } from "react-router-dom";
import NavigateBack from "../../UI components/NavigateBack";
import { PiCheck, PiMapPinDuotone, PiX } from "react-icons/pi";

export default function JobDetails() {
    const location = useLocation();
    const job = location.state;

    return (
        <div className="job__details">
            <div className="job__details--head">
                <NavigateBack />
                <h2>Job Details</h2>
            </div>
            <div className="job__details--main">
                <div className="job__details--cont">
                    <div className="job__details--primary flex-1-2">
                        <h1>{job.title.charAt(0).toUpperCase() + job.title.slice(1)}</h1>
                        <div className="job-status">
                            {
                                job.status === "open" ? <PiCheck className="u-icon-font u-phosphor-icons" /> : <PiX className="u-icon-font u-phosphor-icons" />
                            }
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </div>
                    </div>
                    <div className="job__details--secondary">
                        <div className="details__head">Job Info</div>
                        <div className="detail-item-secondary">{job.company}</div>
                        <div className="detail-item-secondary">{job.type}</div>
                        <div className="detail-item-secondary">{job.remote ? "Remote" : "On-site"}</div>
                        <div className="detail-item-icon">
                            <div className="icon--cont">
                                <PiMapPinDuotone className="u-phosphor-icon u-icon-font" />
                            </div>
                            <p>{job.location.charAt(0).toUpperCase() + job.location.slice(1)}</p>
                        </div>
                        <div className="detail-item-secondary">₹ {job.salary}</div>
                    </div>
                    <div className="job__details--secondary">
                        <div className="details__head">
                            Description
                        </div>
                        <div className="requirements">
                            <h4>Requirements:&nbsp;</h4>
                            {/* <ul>
                                {
                                    job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))
                                }
                            </ul> */}
                            <p>
                                {job.requirements}
                            </p>
                        </div>
                        <div className="description">
                            <p>{job.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}