import HomepageContentPost from "./HomepageContentPost";
import Suggestions from "./Suggestions";
import ImageUpload from "../UI components/ImageUpload";
import PostContainer from "../Posts/PostContainer";

export default function HomepageContent({ profileImg, initials, ...props }) {


    return (
        <main className="content">
            <div className="content__box">
                <section className="content__middle">
                    <HomepageContentPost profileImg={profileImg} initials={initials} />
                    {/* <ImageUpload /> */}
                    <PostContainer />
                </section>
                <section className="content__right">
                    <Suggestions />
                </section>
            </div>
        </main>
    )
}