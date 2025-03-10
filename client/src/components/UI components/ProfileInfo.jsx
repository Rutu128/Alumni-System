import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import UserPostContainer from "../Posts/UserPostContainer";
import Loading from "react-loading";

export default function ProfileInfo({ userDetail, notOwner, showProfileEdit = () => { } }) {
    const [userPosts, setUserPosts] = useState([]);
    const [showFullText, setShowFullText] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { getUserPosts, getOwnerPosts } = useContext(UserContext);

    useEffect(() => {
        console.log('Fetching User Posts...');
        handleFetchPosts();
    }, []);

    async function handleFetchPosts() {
        let posts;
        if (notOwner) {
            posts = await getUserPosts(userDetail._id);
        } else {
            posts = await getOwnerPosts();
        }
        console.log(posts);
        setUserPosts(posts);
        setIsLoading(false);
    }

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    const renderAboutText = () => {
        if (!userDetail.description) {
            return notOwner ?
                'Nothing to show'
                :
                (
                    <button className="u-button-secondary u-width-20rem" onClick={showProfileEdit}>
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
                    <div className="about_college_info">
                        <div className="info--cell">
                            {userDetail.role === 'STUDENT' || userDetail.role === "ALUMNI" ?
                                <>
                                    <div className="info--head">Student ID</div>
                                    <div className="info--value">{userDetail.c_id}</div>
                                </>
                                :
                                <>
                                    <div className="info--head">Faculty ID</div>
                                    <div className="info--value">{userDetail.f_id}</div>
                                </>
                            }
                        </div>
                        {userDetail.role !== 'FACULTY' &&
                            <div className="info--cell">
                                <div className="info--head">Batch</div>
                                <div className="info--value">{userDetail.batch}</div>
                            </div>
                        }
                        <div className="info--cell">
                            <div className="info--head">College</div>
                            <div className="info--value">{userDetail.collage}</div>
                        </div>
                        <div className="info--cell">
                            <div className="info--head">Branch</div>
                            <div className="info--value">{userDetail.branch}</div>
                        </div>
                    </div>
                    <div className="about_text">
                        {renderAboutText()}
                        {userDetail.description &&
                            userDetail.description.length > 100 && (
                                <button className="toggle-text" onClick={toggleFullText}>
                                    {showFullText ? "...Show Less" : "...Show More"}
                                </button>
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="profile__posts">
                <div className="profile__head u-margin-bottom-s_small">
                    <h2>Posts</h2>
                </div>
                {userPosts.length === 0 ?
                    <div className="u-fallback">
                        {/* {isLoading ? <Loading type="spin" color="#333" width={'2rem'} height={'2rem'} className={"loader"} /> : 'No posts to show'} */}
                        <div className="u-fallback-illustration">
                            <img src="/illustrations/no-post.svg" alt=" " />
                        </div>
                        <div className="u-fallback-text">
                            {isLoading ?
                                <Loading type="spin" color="#333" width={'2rem'} height={'2rem'} className={"loader"} />
                                :
                                <h3>No posts to show</h3>
                            }
                        </div>
                    </div>
                    :
                    <UserPostContainer handleFetchPosts={handleFetchPosts} posts={userPosts} notOwner={notOwner} />
                }
            </section>
        </>
    );
}