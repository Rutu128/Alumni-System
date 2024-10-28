export default function GroupInputs({ inputGroups, data, setData }) {

    return (
        <div className="group">
            <div className="group-cont">
                {inputGroups.object.entries.map((field, value) => {
                    return (    
                        <div className="group-item">
                            <div className="group-item-cont">
                                <div className="group-item-head">
                                    {field}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}