import React, { useRef, useEffect } from 'react';
import useOnScreen from '../../Hooks/useOnScreen';
function VideoPost({ src }) {
    const videoRef = useRef();
    const isVisible = useOnScreen(videoRef);

    useEffect(() => {
        if (isVisible) {
            videoRef.current.muted = true; // Ensure the video is muted
            videoRef.current.play().catch(error => {
                console.log('Video play failed: ', error);
            });
        } else {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <div className="video-post">
            <video ref={videoRef} src={src} controls muted />
        </div>
    );
}

export default VideoPost;
