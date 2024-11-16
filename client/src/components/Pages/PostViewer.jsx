import { useParams } from "react-router-dom";
import Post from "../Posts/Post";

export default function PostViewer() {
    const [postData, setPostData] = useState(null);

    const { post_id } = useParams();

    useEffect(() => {
        function fetchPostData() {
            // fetch post data
        }
        fetchPostData();
    }, [])

    return (
        <Post modalView={true} postData={postData} notOwner={true} />
    )
}