import { createContext, useState } from "react";
import { updateJob } from "../../../Backend/src/controller/jobPost.controller";
import postApi from "../utils/API/postApi";
import handleResponse from "../utils/responseHandler";
import getApi from "../utils/API/getApi";
import putApi from "../utils/API/putApi";
import deleteApi from "../utils/API/deleteApi";

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
    uploadJob: () => {},
    getJobs: () => {},
    getJob: () => {},
    deleteJob: () => {},
    updateJob: () => {},
});

export default function JobContextProvider({children}){
    const [jobData, setJobData] = useState([]);

    async function handleUploadJob(job){
        const response = await postApi('/job/upload-job-post', job);
        console.log(response);
        const res = handleResponse(response);
        if(res.status === 200){
            return {
                status: response.status,
            };
        }
    }

    async function handleGetJobs(){
        const response = await getApi('/job/show-jobs');
        console.log(response);
        const res = handleResponse(response);
        if(res.status === 200){
            setJobData(res.data);
        }
    }

    async function handleGetJob(id){
        const response = await getApi(`/job/find-job-post/${id}`);
        console.log(response);
        const res = handleResponse(response);
        if(res.status === 200){
            setJobData(res.data);
        }
    }

    async function handleDeleteJob(id){
        const response = await deleteApi(`/job/delete-job-post/${id}`);
        console.log(response);
        const res = handleResponse(response);
        if(res.status === 200){
            return {
                status: response.status,
            };
        }
    }

    async function handleUpdateJob(id, job){
        const response = await putApi(`/job/update-job-post/${id}`, job);
        console.log(response);
        const res = handleResponse(response);
        if(res.status === 200){
            return {
                status: response.status,
            };
        }
    }

    const ctxValue = {
        jobData: jobData,
        uploadJob: handleUploadJob,
        getJobs: handleGetJobs,
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