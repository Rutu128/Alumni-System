import { PiMapPinDuotone } from "react-icons/pi";
import { formatDate, formatDate2 } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
    return (
        <div className="jobs__list--item">
            <div className="jobs__card">
                <div className="jobs__card--main">
                    <div className="card__1-2 u-margin-bottom-s_small">
                        <div className="card__info highlighted-text">
                            <p>{formatDate2(job.createdAt)}</p>
                        </div>
                        <div className="card__info card__info--icon">
                            <div className="icon--cont">
                                <PiMapPinDuotone className="u-phosphor-icon u-icon-font" />
                            </div>
                            <p>{job.location.charAt(0).toUpperCase() + job.location.slice(1)}</p>
                        </div>
                    </div>
                    <div className="card__title">
                        <h2>{job.title.charAt(0).toUpperCase() + job.title.slice(1)}</h2>
                    </div>
                    <div className="card__1-2">
                        <div className="group">
                            <div className="card__info--secondary">
                                <p>{job.company}</p>
                            </div>
                            <div className="card__info--secondary">
                                <p>{job.type}</p>
                            </div>
                        </div>
                        <div className="card__actions">
                            <button className="u-button-primary" >
                                <Link className="u-link" to={`/jobs/${job._id}`} state={job}>
                                    View Details
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}