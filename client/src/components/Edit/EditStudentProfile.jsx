import { useContext, useState } from "react";
import { studentInputs } from "../../utils/Data/StudentDataStructure";
import Input from "../UI components/Input";
import { UserContext } from "../../context/UserContext";

export default function EditStudentProfile({ }) {
    const { editedInfo, setEditedInfo, createNotification } = useContext(UserContext);

    const [studentInfo, setStudentInfo] = useState(editedInfo);
    const [error, setError] = useState({
        field: '',
        message: ''
    });

    function handleSubmit() {
        for (const [field, value] of Object.entries(studentInfo)) {
            if (value === "") {
                // createNotification("Fill in all the details!", "error");
                setError({
                    field: field,
                    message: "This field is required!"
                });
                return;
            }
        }
        // console.log("Student Info: ", studentInfo);
        setEditedInfo(prevInfo => {
            return {
                ...prevInfo,
                ...studentInfo,
            }
        })
        setTimeout(() => {
            console.log("Student Info: ", editedInfo);
        }, 1000);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setStudentInfo({
            ...studentInfo,
            [name]: value
        })
        setError({});
    }

    return (
        <>
            <main className="edit">
                <div className="edit-cont">
                    <section className="edit-section">
                        <div className="edit-section-head">
                            <h2 className="heading-secondary-dark u-margin-bottom-ss_small">
                                General Details
                            </h2>
                        </div>
                        <div className="edit-section-inputs">
                            {studentInputs.map((field, index) => {
                                return (
                                    <div key={index} className="input-cell">
                                        <div className="edit-label">
                                            {field.label}
                                        </div>
                                        <Input
                                            key={index}
                                            wrapper_class="edit-input-wrapper"
                                            className={`edit-input ${studentInfo[field.name] === "" ? 'invalid' : 'valid'} ${error.field === field.name ? 'error' : ''}`}
                                            // labelText={field.label}
                                            // placeholder={field.label}
                                            name={field.name}
                                            value={studentInfo[field.name] || ''}
                                            onChange={(e) => handleChange(e)}
                                            type={field.type}
                                            errorText={error.field === field.name ? error.message : ''}
                                            {...field}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    <div className="edit-profile-actions">
                        <button className="u-button-primary u-btn-square" onClick={handleSubmit} >
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}