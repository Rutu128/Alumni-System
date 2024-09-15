import HomepageContentPost from "./HomepageContentPost";
import Suggestions from "./Suggestions";
import ImageUpload from "../UI components/ImageUpload";
import PostContainer from "../Posts/PostContainer";
import { log } from "../../log";
import React from 'react';

export default function HomepageContent({ profileImg, initials, ...props }) {
    log('<HomepageContent /> rendered', 2);

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