import { createContext, useContext, useState } from "react";
import postApi from "../utils/API/postApi";
import handleResponse from "../utils/responseHandler";
import getApi from "../utils/API/getApi";
import putApi from "../utils/API/putApi";
import deleteApi from "../utils/API/deleteApi";
import { UserContext } from "./UserContext";

export const JobContext = createContext({
    jobData: {
        userId: String,
        title: String,
        description: String,
        location: String,
        salary: Number,
        requirements: String,
        type: String,
        status: String,
        remote: Boolean,
        company: String,
        createdAt: Date,
        updatedAt: Date,
    },
    uploadJob: () => { },
    getJobs: () => { },
    getUserJobPosts: () => { },
    getJob: () => { },
    deleteJob: () => { },
    updateJob: () => { },
});

// const { userDetail } = useContext(UserContext);

export default function JobContextProvider({ children }) {
    const [jobData, setJobData] = useState([]);

    async function handleUploadJob(job) {
        const response = await postApi('/jobPost/upload-job-post', job);
        console.log(response);
        const res = handleResponse(response);
        return {
            status: res.status,
        };
    }

    async function handleGetJobs() {
        const response = await getApi('/jobPost/show-jobs');
        console.log(response);
        const res = handleResponse(response);
        if (res.status === 200) {
            setJobData(prevData => response.data.data);
        }
    }

    async function handleGetUserJobs() {
        const response = await getApi('/jobPost/job-post-by-user');
        console.log(response);
        const res = handleResponse(response);
        if (res.status === 200) {
            return response.data.data;
        }
    }

    async function handleGetJob(id) {
        const response = await getApi(`/jobPost/find-job-post/${id}`);
        console.log(response);
        const res = handleResponse(response);
        if (res.status === 200) {
            setJobData(res.data.data);
        }
    }

    async function handleDeleteJob(id) {
        const response = await deleteApi(`/jobPost/delete-job-post/${id}`);
        console.log(response);
        const res = handleResponse(response);
        if (res.status === 200) {
            return {
                status: response.status,
            };
        }
    }

    async function handleUpdateJob(id, job) {
        const response = await putApi(`/jobPost/update-job-post/${id}`, job);
        console.log(response);
        const res = handleResponse(response);
        if (res.status === 200) {
            return {
                status: response.status,
            };
        }
    }

    const ctxValue = {
        jobData: jobData,
        uploadJob: handleUploadJob,
        getJobs: handleGetJobs,
        getUserJobPosts: handleGetUserJobs,
        getJob: handleGetJob,
        deleteJob: handleDeleteJob,
        updateJob: handleUpdateJob,
    }

    return (
        <JobContext.Provider value={ctxValue}>
            {children}
        </JobContext.Provider>
    )
}