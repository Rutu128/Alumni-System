import { useContext, useState } from "react";
import { alumniInputs } from "../../utils/Data/AlumniDataStructure";
import Input from "../UI components/Input";
import { UserContext } from "../../context/UserContext";

export default function EditStudentProfile({ }) {
    const { editedInfo, setEditedInfo } = useContext(UserContext);

    const [alumniInfo, setAlumniInfo] = useState(editedInfo);


    function handleChange(e) {
        const { name, value } = e.target;
        setAlumniInfo({
            ...alumniInfo,
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
                            {alumniInputs.map((field, index) => {
                                return (
                                    <>
                                        <div className="input-cell">
                                            <div className="edit-label">
                                                {field.label}
                                            </div>
                                            <Input
                                                key={index}
                                                // wrapper_class="u-margin-bottom-ss_small"
                                                className={`edit-input ${alumniInfo[field.name] === "" ? 'invalid' : 'valid'}`}
                                                // labelText={field.label}
                                                // placeholder={field.label}
                                                name={field.name}
                                                value={alumniInfo[field.name] || ''}
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