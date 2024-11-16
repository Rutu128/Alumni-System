import { Outlet } from "react-router-dom";
import DisplayJobs from "../components/Pages/Jobs/DisplayJobs";
import JobContextProvider from "../context/JobContext";
import "../sass/pages/_jobs.scss";

export default function JobPostings() {
    return (
        <JobContextProvider>
            <main className="jobs">
                <div className="jobs__cont">
                    <div className="jobs__cont--main">
                        <Outlet />
                    </div>
                </div>
            </main>
        </JobContextProvider>
    )
}