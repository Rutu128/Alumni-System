import { useContext, useState } from "react";
import { alumniInputs } from "../../utils/Data/AlumniDataStructure";
import Input from "../UI components/Input";
import { UserContext } from "../../context/UserContext";
import DegreeInputContainer from "./DegreeInputContainer";
import { PiBagDuotone, PiStudentDuotone, PiUserCircleDuotone } from "react-icons/pi";
import ExperienceInputContainer from "./ExperienceInputContainer";

export default function EditStudentProfile({ }) {
    const { editedInfo, setEditedInfo, createNotification } = useContext(UserContext);

    const [alumniInfo, setAlumniInfo] = useState(editedInfo);
    const [selectedMenu, setSelectedMenu] = useState('General');
    const [degreeInfo, setDegreeInfo] = useState([]);
    const [experienceInfo, setExperienceInfo] = useState([]);
    const [error, setError] = useState({
        field: '',
        message: ''
    });

    function submitInfo() {
        for (const [field, value] of Object.entries(alumniInfo)) {
            if (value === "" || !value) {
                setError({
                    field: field,
                    message: "This field is required!"
                });
                return;
            }
        }
        for (const degree of degreeInfo) {
            for (const [field, value] of Object.entries(degree)) {
                if (value === "" && (field !== 'endYear' && field !== 'isPursuing')) {
                    setSelectedMenu("Degrees");
                    createNotification("Fill in all the degree details!", "error");
                    return;
                }
            }
        }
        for (const experience of experienceInfo) {
            for (const [field, value] of Object.entries(experience)) {
                if (value === "") {
                    setSelectedMenu("Professional");
                    createNotification("Fill in all the experience details!", "error");
                    return;
                }
            }
        }
        console.log("Alumni Info: ", alumniInfo);
        console.log("Degrees submitted : ", degreeInfo);
        setEditedInfo(prevInfo => {
            return {
                ...prevInfo,
                ...alumniInfo,
                degrees: degreeInfo,
                experience: experienceInfo
            }
        })
    }



    function handleChange(e) {
        const { name, value } = e.target;
        setAlumniInfo({
            ...alumniInfo,
            [name]: value
        })
        setError({});
    }

    return (
        <>
            <main className="edit">
                <div className="edit-cont">
                    <div className="edit-cont--head u-margin-bottom-ss_small">
                        <div className="head--categories">
                            <div className={`categories--item ${selectedMenu === "General" && "selected"}`} onClick={() => setSelectedMenu("General")}>
                                <div className="item--icon"><PiUserCircleDuotone className="u-phosphor-icons-settings" /></div>
                                <div className="icon--name">General</div>
                            </div>
                            <div className={`categories--item ${selectedMenu === "Degrees" && "selected"}`} onClick={() => setSelectedMenu("Degrees")}>
                                <div className="item--icon"><PiStudentDuotone className="u-phosphor-icons-settings" /></div>
                                <div className="icon--name">Education</div>
                            </div>
                            <div className={`categories--item ${selectedMenu === "Professional" && "selected"}`} onClick={() => setSelectedMenu("Professional")}>
                                <div className="item--icon"><PiBagDuotone className="u-phosphor-icons-settings" /></div>
                                <div className="icon--name">Professional</div>
                            </div>
                        </div>
                    </div>
                    {selectedMenu === 'General' &&
                        <section className="edit-section">
                            <div className="edit-section-head">
                                <h2 className="heading-secondary-dark u-margin-bottom-ss_small">
                                    General Details
                                </h2>
                            </div>
                            <div className="edit-section-inputs">
                                {alumniInputs.map((field, index) => {
                                    return (
                                        <div className="input-cell" key={index}>
                                            <div className="edit-label">
                                                {field.label}
                                            </div>
                                            <Input
                                                wrapper_class="edit-input-wrapper"
                                                className={`edit-input ${alumniInfo[field.name] === "" || alumniInfo[field.name] == null ? 'invalid' : 'valid'} ${error.field === field.name ? 'error' : ''}`}
                                                // labelText={field.label}
                                                // placeholder={field.label}
                                                name={field.name}
                                                value={alumniInfo[field.name] || ''}
                                                onChange={(e) => handleChange(e)}
                                                type={field.type}
                                                errorText={error.field === field.name ? error.message : ''}
                                                {...field}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </section>}
                    {selectedMenu === 'Degrees' &&
                        <DegreeInputContainer degreeInfo={degreeInfo} setDegreeInfo={setDegreeInfo} />
                    }
                    {selectedMenu === 'Professional' &&
                        <ExperienceInputContainer experienceInfo={experienceInfo} setExperienceInfo={setExperienceInfo} />
                    }
                    <div className="edit-profile-actions">
                        <button className="u-button-primary u-btn-square" onClick={submitInfo}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}