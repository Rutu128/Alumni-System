import HomepageContentPost from "./HomepageContentPost";
import Suggestions from "./Suggestions";
import ImageUpload from "../UI components/ImageUpload";

export default function HomepageContent({ profileImg, initials, ...props }) {


    return (
        <main className="content">
            <div className="content__box">
                <section className="content__middle">
                    <HomepageContentPost profileImg={profileImg} initials={initials} />
                    {/* <ImageUpload /> */}
                </section>
                <section className="content__right">
                    <Suggestions />
                </section>
            </div>
        </main>
    )
}