import { useContext, useState } from "react"
import { DegreeDataStructure } from "../../utils/Data/GeneralDataStructures";
import DegreeInput from "./DegreeInput";
import "../../sass/components/_batchInputs.scss";
import { UserContext } from "../../context/UserContext";

export default function DegreeInputContainer({ degrees = DegreeDataStructure, setInfo, degreeInfo, setDegreeInfo }) {
    const [expandedBlock, setExpandedBlock] = useState(0);
    const { createNotification } = useContext(UserContext);

    function addDegree(degree) {
        for (const [field, value] of Object.entries(degree)) {
            if (value === "" && (field !== 'endYear' && field !== 'isPursuing')) {
                console.log("Invalid Field:");
                return;
            }
        }

        setDegreeInfo(prevInfo => {
            if (prevInfo.length === 1) {
                return [degree];
            }
            else {
                return [...prevInfo, degree];
            }
        })
        setExpandedBlock(null);
        console.log("Degree added : ", degree); 
    }

    function deleteDegree(index) {
        setDegreeInfo(prevInfo => {
            return prevInfo.filter((degree, i) => i !== index);
        })
        if (expandedBlock === index) {
            setExpandedBlock(0);
        }
    }

    function newDegree(){
        for (const degree of degreeInfo) {
            for (const [field, value] of Object.entries(degree)) {
                if (value === "") {
                    createNotification("")
                    return;
                }
            }
        }
        setExpandedBlock(degreeInfo.length);
        setDegreeInfo(prevInfo => {
            return [...prevInfo, DegreeDataStructure[0]];
        })
    }

    return (
        <>
            <div className="batchInput">
                <div className="batchInput__cont">
                    <div className="batchInput__head u-section-header u-margin-bottom-ss_small">
                        <h2 className="batchInput__title">Degrees</h2>
                    </div>
                    <div className="batchInput__degree--cont u-margin-bottom-s_small">
                        {degreeInfo.length > 0 && degreeInfo.map((degree, index) => {
                            return (
                                <div className="batchInput__cell u-margin-bottom-s_small" key={index}>
                                    <DegreeInput degree={degree} addDegree={addDegree} setExpandedBlock={setExpandedBlock} isExpanded={expandedBlock === index} index={index} deleteDegree={deleteDegree} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="batchInput__new">
                        <button className="u-button-secondary u-btn-square batchInput__add" onClick={newDegree}>Add Degree</button>
                    </div>
                </div>
            </div>
        </>
    )
}