import { useContext, useState } from "react";
import { studentInputs } from "../../utils/Data/StudentDataStructure";
import Input from "../UI components/Input";
import { UserContext } from "../../context/UserContext";

export default function EditStudentProfile({ }) {
    const { editedInfo, setEditedInfo } = useContext(UserContext);

    const [studentInfo, setStudentInfo] = useState(editedInfo);


    function handleChange(e) {
        const { name, value } = e.target;
        setStudentInfo({
            ...studentInfo,
            [name]: value
        })
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
                                    <>
                                        <div className="input-cell">
                                            <div className="edit-label">
                                                {field.label}
                                            </div>
                                            <Input
                                                key={index}
                                                // wrapper_class="u-margin-bottom-ss_small"
                                                className={`edit-input ${studentInfo[field.name] === "" ? 'invalid' : 'valid'}`}
                                                // labelText={field.label}
                                                // placeholder={field.label}
                                                name={field.name}
                                                value={studentInfo[field.name] || ''}
                                                onChange={(e) => handleChange(e)}
                                                type={field.type}
                                                errorText={''}
                                                {...field}
                                            />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}