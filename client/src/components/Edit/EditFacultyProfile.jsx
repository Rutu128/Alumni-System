import { useContext, useState } from "react";
import { facultyInputs } from "../../utils/Data/FacultyDataStructure";
import Input from "../UI components/Input";
import { UserContext } from "../../context/UserContext";
import { PiBagDuotone, PiStudentDuotone, PiUserCircleDuotone } from "react-icons/pi";
import DegreeInputContainer from "./DegreeInputContainer";
import { DegreeDataStructure } from "../../utils/Data/GeneralDataStructures";

export default function EditFacultyProfile() {
    const { editedInfo, setEditedInfo, createNotification } = useContext(UserContext);

    const [facultyInfo, setFacultyInfo] = useState(editedInfo);
    const [selectedMenu, setSelectedMenu] = useState('General');
    const [degreeInfo, setDegreeInfo] = useState([]);
    const [error, setError] = useState({
        field: '',
        message: ''
    });

    function submitInfo() { 
        for (const [field, value] of Object.entries(facultyInfo)) {
            if (value === "") {
                setSelectedMenu("General");
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
        console.log("Faculty Info: ", facultyInfo);
        console.log("Degrees submitted : ", degreeInfo);
        setEditedInfo(prevInfo => {
            return {
                ...prevInfo,
                ...facultyInfo,
                degrees: degreeInfo
            }
        })
        setTimeout(() => {
            console.log("Edited Info: ", editedInfo);
        }, 1000);
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setFacultyInfo({
            ...facultyInfo,
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
                                <div className="icon--name">Degrees</div>
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
                                {facultyInputs.map((field, index) => {
                                    return (
                                        <div className="input-cell" key={index} >
                                            <div className="edit-label">
                                                {field.label}
                                            </div>
                                            <Input
                                                key={index}
                                                wrapper_class="edit-input-wrapper"
                                                className={`edit-input ${facultyInfo[field.name] === "" ? 'invalid' : 'valid'} ${error.field === field.name ? 'error' : ''}`}
                                                // labelText={field.label}
                                                // placeholder={field.label}
                                                name={field.name}
                                                value={facultyInfo[field.name] || ''}
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
                    }
                    {selectedMenu === 'Degrees' &&
                        <DegreeInputContainer degreeInfo={degreeInfo} setDegreeInfo={setDegreeInfo} />
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