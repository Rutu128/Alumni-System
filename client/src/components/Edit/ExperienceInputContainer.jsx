import { useContext, useState } from "react";
import ExperienceInput from "./ExperienceInput";
import { UserContext } from "../../context/UserContext";
import { ExperienceDataStructure } from "../../utils/Data/GeneralDataStructures";

export default function ExperienceInputContainer({ experience = ExperienceDataStructure, setInfo, experienceInfo, setExperienceInfo }) {
    const [expandedBlock, setExpandedBlock] = useState(0);
    const { createNotification } = useContext(UserContext);

    function addExperience(experience) {
        for (const [field, value] of Object.entries(experience)) {
            if ( field !== "endYear" && field !== "isCurrentlyWorking" && value === "") {
                console.log("Invalid Field:");
                return;
            }
        }

        setExperienceInfo(prevInfo => {
            if (prevInfo.length === 1) {
                return [experience];
            }
            else {
                return [...prevInfo, experience];
            }
        })
        setExpandedBlock(null);
        console.log("Experience added : ", experience);
    }

    function deleteExperience(index) {
        setExperienceInfo(prevInfo => {
            return prevInfo.filter((experience, i) => i !== index);
        })
        if (expandedBlock === index) {
            setExpandedBlock(0);
        }
    }

    function newExperience() {
        for (const experience of experienceInfo) {
            for (const [field, value] of Object.entries(experience)) {
                if (value === "" && (field !== 'endYear' && field !== 'isCurrentlyWorking')) {
                    createNotification(`Fill in all the details!`, "error");
                    return;
                }
            }
        }
        setExpandedBlock(experienceInfo.length);
        setExperienceInfo(prevInfo => {
            return [...prevInfo, ExperienceDataStructure[0]];
        })
    }

    return (
        <>
            <div className="batchInput">
                <div className="batchInput__cont">
                    <div className="batchInput__head u-section-header u-margin-bottom-ss_small">
                        <h2 className="batchInput__title">Experience</h2>
                    </div>
                    <div className="batchInput__degree--cont u-margin-bottom-s_small">
                        {experienceInfo.length > 0 && experienceInfo.map((experience, index) => {
                            return (
                                <div className="batchInput__cell u-margin-bottom-s_small" key={index}>
                                    <ExperienceInput addExperience={addExperience} key={index} index={index} experience={experience} setExperience={setExperienceInfo} isExpanded={expandedBlock === index} setExpandedBlock={setExpandedBlock} deleteExperience={deleteExperience} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="batchInput__add u-margin-bottom-s_small">
                        <button className="btn u-btn-square u-button-secondary" onClick={newExperience}>Add Experience</button>
                    </div>
                </div>
            </div>
        </>
    )
}