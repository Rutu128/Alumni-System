import { useContext, useEffect } from "react"
import { JobContext } from "../../../context/JobContext"
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

export default function DisplayJobs() {
    const { jobData, getJobs } = useContext(JobContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {
        await getJobs();
        console.log(jobData);
    }

    return (
        <>
            <div className="jobs__cont--head u-margin-bottom-s_small">
                <h1>Job Postings</h1>
            </div>
            <div className="display-jobs-wrapper">
                <div className="jobs__list">
                    {jobData?.map((job, index) => {
                        return (
                            <JobCard key={index} job={job} />
                        )
                    })}
                </div>
                <div className="job-actions">
                    <button 
                        className="u-button-primary u-button-primary-1"
                        onClick={() => navigate('/jobs/new')}
                    >Post a Job</button>
                    <button 
                        className="u-button-secondary u-button-secondary-1"
                        onClick={() => navigate('/jobs/myPosts')}
                    >My Job Posts</button>
                </div>
            </div>
        </>
    )
}