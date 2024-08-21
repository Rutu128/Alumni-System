import { useContext, useEffect, useState } from "react";
import CategoryItem from "./Setting/CategoryItem";
import { PiKey, PiGearSix } from "react-icons/pi";
import { Categories } from "./Setting/Categories";
import { GlobalContext } from "../../context/GlobalContext";
import SettingGeneral from "./Setting/SettingGeneral";
import "../../sass/pages/_settings.scss";

export default function Settings() {
    const [selectedCategory, setSelectedCategory] = useState({
        name: 'General',
        component: <SettingGeneral />
    });

    const { setSelectedMenu } = useContext(GlobalContext);

    useEffect(() => {
        setSelectedMenu('Settings');
    }, [])

    function handleChangeCategory(category) {
        setSelectedCategory({
            name: category.name,
            component: category.component
        });
    }

    return (
        <div className="settings">
            <div className="settings__cont">
                <div className="settings__main">
                    <div className="settings__head">
                        <div className="head--title u-margin-bottom-s_small">
                            <h1>Settings</h1>
                        </div>
                        <div className="head--categories u-margin-bottom-s_small">
                            {Categories.map((category) => {
                                return (
                                    <CategoryItem key={category.name} category={category} isSelected={selectedCategory.name  === category.name} changeCategory={handleChangeCategory} />
                                )
                            })}
                        </div>
                    </div>
                    <div className="settings__body">
                        <div className="settings__body--main">
                            {selectedCategory.component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}