export default function SettingItem({name, description, buttonClass, buttonIcon, buttonLabel, buttonAction}) {
    return (
        <div className="s-item">
            <div className="s-item-cont">
                <div className="s-item-name">
                    {name}
                </div>
                <div className="s-item-description">
                    {description}
                </div>
                <div className="s-item-action">
                    <button className={buttonClass + ' btn'} onClick={buttonAction}>
                        {buttonIcon}
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}