import { useCallback, useContext, useState } from "react";
import { jobDataStructure, JobInputs } from "../../../utils/Form/JobInputs";
import Input from "../../UI components/Input";
import NavigateBack from "../../UI components/NavigateBack";
import { JobContext } from "../../../context/JobContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreateJobPost({ job = jobDataStructure, editMode = false }) {
    const [jobInfo, setJobInfo] = useState(job);
    const [error, setError] = useState({
        field: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);

    const { uploadJob } = useContext(JobContext);
    const { createNotification } = useContext(UserContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setJobInfo({ ...jobInfo, [e.target.name]: e.target.value });
        setError({}); // Clear error message
    }

    async function submitJob() {
        for (const [field, value] of Object.entries(jobInfo)) {
            if (value === "" || !value) {
                setError({
                    field: field,
                    message: "This field is required!"
                });
                return;
            }
        }
        console.log("Job Info: ", jobInfo);
        let response = await uploadJob(jobInfo);
        if(response.status === 200){
            createNotification('Job posted successfully!', 'success');
            navigate('/jobs');
        } else {
            createNotification('Error posting job!', 'error');
        }
        setSuccess(true);
    }

    return (
        <section className="create-job">
            <div className="jobs__cont--head u-margin-bottom-s_small">
                <NavigateBack />
                <h1>Create New Job</h1>
            </div>
            {JobInputs.map((input, index) => {
                return (
                    <div key={index} className="form-group u-margin-bottom-s_small">
                        <Input
                            wrapper_class="edit-input-wrapper"
                            type={input.type}
                            name={input.name}
                            id={input.name}
                            value={jobInfo[input.name]}
                            onChange={handleChange}
                            labelText={input.label}
                            className={`edit-input ${jobInfo[input.name] === "" || jobInfo[input.name] == null ? 'invalid' : 'valid'} ${error.field === input.name ? 'error' : ''}`}
                            errorText={error.field === input.name ? error.message : ''}
                            {...input}
                        />
                    </div>
                )
            })}
            <div className="create-job--actions">
                <button className="u-button-primary u-button-primary-1" onClick={submitJob}>Create Job</button>
            </div>
        </section>
    )
}