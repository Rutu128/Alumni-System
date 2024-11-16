import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../../context/JobContext";
import NavigateBack from "../../UI components/NavigateBack";
import JobCard from "./JobCard";

export default function MyJobPosts(){
    const [myPosts, setMyPosts] = useState([]);

    const { getUserJobPosts } = useContext(JobContext);

    async function getUserPosts(){
        const posts = await getUserJobPosts();
        setMyPosts(posts);
    }

    useEffect(() => {
        getUserPosts();
    }, [])
    
    return (
        <>
            <div className="jobs__cont--head u-margin-bottom-s_small">
                <NavigateBack />
                <h1>Your Job Posts</h1>
            </div>
            <div className="display-jobs-wrapper">
                <div className="jobs__list jobs__list--myPosts">
                    {myPosts?.map((job, index) => {
                        return (
                            <JobCard key={index} job={job} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}