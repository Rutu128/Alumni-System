import HomepageContentPost from "./HomepageContentPost";
import Suggestions from "./Suggestions";
import ImageUpload from "../UI components/ImageUpload";
import PostContainer from "../Posts/PostContainer";
import { log } from "../../log";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function HomepageContent({ profileImg, initials, ...props }) {
    log('<HomepageContent /> rendered', 2);
    const { setSelectedMenu } = useContext(GlobalContext);

    useEffect(() => {
        setSelectedMenu('Home');
    }, [])

    return (
        <>
            <section className="content__middle">
                <HomepageContentPost profileImg={profileImg} initials={initials} />
                {/* <ImageUpload /> */}
                <PostContainer />
            </section>
            <section className="content__right">
                <Suggestions />
            </section>
        </>
    )
}