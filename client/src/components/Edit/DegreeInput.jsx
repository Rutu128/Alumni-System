import { useState } from "react";
import { DegreeDataStructure } from "../../utils/Data/GeneralDataStructures";
import Input from "../UI components/Input";
import { PiCaretDown, PiCaretUp, PiCheck, PiCheckSquareFill, PiPlus, PiPlusBold, PiSquare, PiTrashDuotone } from "react-icons/pi";


export default function DegreeInput({ degree = DegreeDataStructure[0], addDegree, isExpanded, index, deleteDegree, setExpandedBlock }) {

    const [degreeInfo, setDegreeInfo] = useState(degree);
    const [error, setError] = useState({
        field: '',
        message: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);

        setError({});

        setDegreeInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value,
            }
        })
    }

    function submitDegree() {
        for (const [field, value] of Object.entries(degreeInfo)) {
            if (value === "" && (field !== 'endYear' && field !== 'isPursuing')) {
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
            addDegree(degreeInfo);
        }
    }

    if (!isExpanded) {
        return (
            <div className="cell-wrapper">
                <div className="cell--shrinked">
                    <h1 className="heading-secondary-dark-small u-il-blk" >
                        {(degreeInfo.degree === "" ? "Degree" : degreeInfo.degree) + (degreeInfo.major === "" ? "" : " in " + degreeInfo.major)}
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
                            Degree Details
                        </h1>
                        <div className={`cell--actions u-il-blk ${isExpanded ? "rotated" : null}`} onClick={() => setExpandedBlock(isExpanded ? null : index)} >
                            <PiCaretDown className="u-phosphor-icon u-icon-font u-il-blk" />
                        </div>
                    </div>
                    <div className="cell--block">
                        <div className="input-cell">
                            <div className="edit-label">
                                Degree
                            </div>
                            <Input
                                className={`edit-input ${degreeInfo.degree === "" ? 'invalid' : 'valid'} ${error.field === 'degree' ? 'invalid' : 'valid'}`}
                                name={"degree"}
                                value={degreeInfo.degree || ''}
                                onChange={(e) => handleChange(e)}
                                type={'text'}
                                errorText={error.field === "degree" ? error.message : ''}
                            />
                        </div>
                        <div className="input-cell">
                            <div className="edit-label">
                                Major
                            </div>
                            <Input
                                className={`edit-input ${degreeInfo.major === "" ? 'invalid' : 'valid'} ${error.field === 'major' ? 'invalid' : 'valid'}`}
                                name={"major"}
                                value={degreeInfo.major || ''}
                                onChange={(e) => handleChange(e)}
                                type={'text'}
                                errorText={error.field === "major" ? error.message : ''}
                            />
                        </div>
                    </div>
                    <div className="cell--block">
                        <div className="input-cell">
                            <div className="edit-label">
                                College
                            </div>
                            <Input
                                className={`edit-input ${degreeInfo.college === "" ? 'invalid' : 'valid'} ${error.field === 'college' ? 'invalid' : 'valid'}`}
                                name={"college"}
                                value={degreeInfo.college || ''}
                                onChange={(e) => handleChange(e)}
                                type={'text'}
                                errorText={error.field === "college" ? error.message : ''}
                            />
                        </div>
                    </div>
                    <div className="cell--block">
                        <div className="input-cell">
                            <div className="edit-label">
                                Start Date
                            </div>
                            <Input
                                className={`edit-input ${degreeInfo.startYear === "" ? 'invalid' : 'valid'} ${error.field === 'startYear' ? 'invalid' : 'valid'}`}
                                name={"startYear"}
                                value={degreeInfo.startYear || ''}
                                onChange={(e) => handleChange(e)}
                                type={'month'}
                                errorText={error.field === "startYear" ? error.message : ''}
                            />
                        </div>
                        {!degreeInfo.isPursuing &&
                            <div className="input-cell">
                                <div className="edit-label">
                                    End Date
                                </div>
                                <Input
                                    className={`edit-input ${degreeInfo.endYear === "" ? 'invalid' : 'valid'} ${error.field === 'endYear' ? 'invalid' : 'valid'}`}
                                    name={"endYear"}
                                    value={degreeInfo.endYear || ''}
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
                                Pursuing
                            </label>
                            <div className="checkbox"
                                onClick={() => {
                                    setDegreeInfo(prevInfo => {
                                        return {
                                            ...prevInfo,
                                            isPursuing: !prevInfo.isPursuing
                                        }
                                    })
                                }}>
                                {degreeInfo.isPursuing ? <PiCheckSquareFill className="u-phosphor-icons font-theme" /> : <PiSquare className="u-phosphor-icons" />}
                            </div>
                        </div>
                    </div>
                    <div className="cell--actions">
                        <button className="u-btn-square u-button-primary" onClick={() => submitDegree()}>
                            <PiCheck className="u-phosphor-icons u-icon-font u-icon-margin-r" />
                            Save
                        </button>
                        <button className="u-btn-square u-button-secondary" onClick={() => deleteDegree(index)}>
                            <PiTrashDuotone className="u-phosphor-icons u-icon-font u-icon-margin-r" />
                            Delete
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

