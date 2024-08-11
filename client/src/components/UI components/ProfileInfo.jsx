import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import UserPostContainer from "../Posts/UserPostContainer";
import Loading from "react-loading";

export default function ProfileInfo({ userDetail }) {
    const [userPosts, setUserPosts] = useState([]);
    const [showFullText, setShowFullText] = useState(false);

    const { getUserPosts } = useContext(UserContext);

    useEffect(() => {
        async function handleFetchPosts() {
            const posts = await getUserPosts();
            console.log(posts);
            setUserPosts(posts);
        }
        handleFetchPosts();
    }, []);

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    const renderAboutText = () => {
        if(!userDetail.description){
            return (
                <button className="u-button-secondary u-width-20rem">
                    Add your Description
                </button>
            )
        }
        else if (showFullText) {
            return userDetail.description;
        }
        else {
            const words = userDetail.description.split(" ");
            const shortenedText = words.slice(0, 40).join(" ");
            return shortenedText;
        }
    };

    return (
        <>
            <section className="profile__about u-margin-bottom-small">
                <div className="profile__head u-margin-bottom-s_small">
                    <h2>About</h2>
                </div>
                <div className="details u-flex-justify-center">
                    <div className="about_text">
                        {renderAboutText()}
                        {userDetail.description.length > 50 && (
                            <button className="toggle-text" onClick={toggleFullText}>
                                {showFullText ? "...Show Less" : "...Show More"}
                            </button>
                        )}
                    </div>
                </div>
            </section>
            <section className="profile__posts">
                <div className="profile__head u-margin-bottom-s_small">
                    <h2>Posts</h2>
                </div>
                {userPosts && userPosts.length === 0 ?
                    <Loading type="spin" color="#333" width={'2rem'} height={'2rem'} className={"loader"} />
                    :
                    <UserPostContainer posts={userPosts} />
                }
            </section>
        </>
    );
}