export default function PostOptionMenu ({post_id, }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="post__menu--cont">
            <button>Menu</button>
            <div className={`post__menu ${isActive ? 'active' : ''}`}>
                <ul>
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>
            </div>
        </div>
    )
}