import React, { useState } from 'react';
import UserProfile from "./UserProfile";
import { formatDate } from "../../utils/formatDate";

import { PiThumbsUpDuotone, PiChatTeardropText, PiShare, PiChatTeardropTextFill, PiThumbsUpFill } from "react-icons/pi";

export default function Post({ postData, likePost }) {
    const [selectedOption, setSelectedOption] = useState({
        like: false,
        comment: false,
    });

    function handleSelection(option){
        setSelectedOption(prevOption => {
            return {
                ...prevOption,
                [option]: !prevOption[option],
            }
        });
        if(option === 'like'){
            console.log('Post liked!!');
            const res = likePost(postData._id);
            if(res === 200){
                postData.likes += 1;
            }
        }
    }

    const isImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    };

    const isVideo = (url) => {
        return url.match(/\.(mp4|webm|ogg)$/) != null;
    };

    const isPdf = (url) => {
        return url.match(/\.(pdf)$/) != null;
    };

    // Function to convert original PDF URL to the processed format
    const getProcessedPdfUrl = (url) => {
        const urlParts = url.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        return `https://res.cloudinary.com/dp6lbnxpa/image/upload/f_auto,q_auto/${publicId}`;
    };

    return (
        <div className="post">
            <div className="post__container">
                <div className="post__head">
                    <div className="post__profile">
                        <UserProfile initials={postData.user.initials} className="user-profile" />
                    </div>
                    <div className="post__userInfo">
                        <div className="user_name">
                            {postData.user.firstName + ' ' + postData.user.lastName}
                        </div>
                        <div className="post_date">
                            {formatDate(postData.createdAt, true)}
                        </div>
                    </div>
                </div>
                <div className="post__description">
                    {postData.description}
                </div>
                <div className="post__content">
                    {postData.content.length > 0 &&
                        <div className="content-container">
                            {postData.content.map((content, index) => {
                                return (
                                    <div className="media-container" key={index}>
                                        {isImage(content.url) && <img src={content.url} alt="Post media" />}
                                        {isVideo(content.url) && (
                                            <video controls>
                                                <source src={content.url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {isPdf(content.url) && (
                                            <img 
                                                src={getProcessedPdfUrl(content.url)} 
                                                alt='User content'
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className="post__statistics">
                    <div className="likes">
                        {(selectedOption.like ? postData.likes + 1 : postData.likes) + ' Likes'}
                    </div>
                    {/* <div>|</div> 
                    <div className="comments">
                        {postData.comments.length + ' Comments'}
                    </div> */}
                </div>
                <div className="post__foot">
                    <button className="post-interactions" onClick={() => handleSelection('like')}>
                        {selectedOption.like
                        ?
                        <PiThumbsUpFill 
                            className='interaction-icons align'
                        />
                        :
                        <PiThumbsUpDuotone
                            className='interaction-icons align'
                        />
                        }
                        Like
                    </button>
                    <button className="post-interactions" onClick={() => handleSelection('comment')}>
                        {selectedOption.comment
                        ?
                        <PiChatTeardropTextFill 
                            className='interaction-icons align' 
                        />
                        :
                        <PiChatTeardropText 
                            className='interaction-icons align'
                        />
                        }
                        
                        Comment
                    </button>
                    <button className="post-interactions" onClick={() => handleSelection('share')}>
                        <PiShare 
                            className={`interaction-icons`}
                        />
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}
