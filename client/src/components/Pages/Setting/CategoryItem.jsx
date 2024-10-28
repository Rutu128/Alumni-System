export default function CategoryItem({category, isSelected, changeCategory}) {
    return (
        <div className={`categories--item ${isSelected ? 'selected' : null}`} onClick={() => changeCategory(category)}>
            <div className="item--icon">{category.icon}</div>
            <div className="item--name">{category.name}</div>
        </div>
    )
}