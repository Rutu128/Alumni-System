import { PiCaretDown, PiCheck, PiCheckSquareFill, PiSquare, PiTrashDuotone } from "react-icons/pi";
import Input from "../UI components/Input";
import { useState } from "react";

export default function ExperienceInput({ index, experience, addExperience, setExperience, isExpanded, setExpandedBlock, deleteExperience }) {
    const [experienceInfo, setExperienceInfo] = useState(experience);
    const [error, setError] = useState({
        field: '',
        message: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);

        setError({});

        setExperienceInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value,
            }
        })
    }

    function submitExperience() {
        for (const [field, value] of Object.entries(experienceInfo)) {
            if (value === "" && (field !== 'endYear' && field !== 'isCurrentlyWorking')) {
                setError((prevError) => {
                    console.log(prevError);
                    return {
                        field: field,
                        message: "This field is required"
                    }
                })
                return;
            }
        }
        console.log(error);
        if (error.field === '' || error.field === undefined) {
            addExperience(experienceInfo);
        }
    }
    
    if (!isExpanded) {
        return (
            <div className="cell-wrapper">
                <div className="cell--shrinked">
                    <h1 className="heading-secondary-dark-small u-il-blk" >
                        {(experienceInfo.position === "" ? "Job Experience" : experienceInfo.position) + (experienceInfo.company === "" ? "" : " at " + experienceInfo.company)}
                    </h1>
                    <div className="cell--actions u-il-blk" onClick={() => setExpandedBlock(index)} >
                        <PiCaretDown className="u-phosphor-icon u-icon-font u-il-blk" />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className="cell--wrapper expanded">
                    <div className="cell--shrinked u-margin-bottom-s_small">
                        <h1 className="heading-secondary-dark-small u-il-blk" >
                            Job Details
                        </h1>
                        <div className={`cell--actions u-il-blk ${isExpanded ? "rotated" : null}`} onClick={() => setExpandedBlock(isExpanded ? null : index)} >
                            <PiCaretDown className="u-phosphor-icon u-icon-font u-il-blk" />
                        </div>
                    </div>
                    <div className="cell--block">
                        <div className="input-cell">
                            <div className="edit-label">
                                Company
                            </div>
                            <Input
                                className={`edit-input ${experienceInfo.company === "" ? 'invalid' : 'valid'} ${error.field === 'company' ? 'invalid' : 'valid'}`}
                                name={"company"}
                                value={experienceInfo.company || ''}
                                onChange={(e) => handleChange(e)}
                                type={'text'}
                                errorText={error.field === "company" ? error.message : ''}
                            />
                        </div>
                    </div>
                    <div className="cell--block">
                        <div className="input-cell">
                            <div className="edit-label">
                                Position
                            </div>
                            <Input
                                className={`edit-input ${experienceInfo.position === "" ? 'invalid' : 'valid'} ${error.field === 'position' ? 'invalid' : 'valid'}`}
                                name={"position"}
                                value={experienceInfo.position || ''}
                                onChange={(e) => handleChange(e)}
                                type={'text'}
                                errorText={error.field === "position" ? error.message : ''}
                            />
                        </div>
                    </div>
                    <div className="cell--block">
                        <div className="input-cell">
                            <div className="edit-label">
                                Start Date
                            </div>
                            <Input
                                className={`edit-input ${experienceInfo.startYear === "" ? 'invalid' : 'valid'} ${error.field === 'startYear' ? 'invalid' : 'valid'}`}
                                name={"startYear"}
                                value={experienceInfo.startYear || ''}
                                onChange={(e) => handleChange(e)}
                                type={'month'}
                                errorText={error.field === "startYear" ? error.message : ''}
                            />
                        </div>
                        {!experienceInfo.isCurrentlyWorking &&
                            <div className="input-cell">
                                <div className="edit-label">
                                    End Date
                                </div>
                                <Input
                                    className={`edit-input ${experienceInfo.endYear === "" ? 'invalid' : 'valid'} ${error.field === 'endYear' ? 'invalid' : 'valid'}`}
                                    name={"endYear"}
                                    value={experienceInfo.endYear || ''}
                                    onChange={(e) => handleChange(e)}
                                    type={'month'}
                                    errorText={error.field === "endYear" ? error.message : ''}
                                />
                            </div>
                        }
                    </div>
                    <div className="cell--block u-margin-bottom-s_small">
                        <div className="input-cell input-cell-checkbox">
                            <label className="edit-label">
                                Currently Working
                            </label>
                            <div className="checkbox"
                                onClick={() => {
                                    setExperienceInfo(prevInfo => {
                                        return {
                                            ...prevInfo,
                                            isCurrentlyWorking: !prevInfo.isCurrentlyWorking
                                        }
                                    })
                                }}>
                                {experienceInfo.isCurrentlyWorking ? <PiCheckSquareFill className="u-phosphor-icons font-theme" /> : <PiSquare className="u-phosphor-icons" />}
                            </div>
                        </div>
                    </div>
                    <div className="cell--actions">
                        <button className="u-btn-square u-button-primary" onClick={() => submitExperience()}>
                            <PiCheck className="u-phosphor-icons u-icon-font u-icon-margin-r" />
                            Save
                        </button>
                        <button className="u-btn-square u-button-secondary" onClick={() => deleteExperience(index)}>
                            <PiTrashDuotone className="u-phosphor-icons u-icon-font u-icon-margin-r" />
                            Delete
                        </button>
                    </div>
                </div>
            </>
        )
    }
}