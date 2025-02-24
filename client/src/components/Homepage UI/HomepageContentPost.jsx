import Input from '../UI components/Input';
import { FaTelegramPlane } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import ProfileImage from './ProfileImage';
import ModalContainer from '../Modal UI/ModalContainer';
import PostModal from '../Modal UI/PostModal';
import { PostContext } from '../../context/PostContext';
import ReactLoading from 'react-loading';
import { log } from '../../log';
import { ImageIcon } from '../Icon/HomepageIcons';
import React from 'react';


export default function HomepageContentPost({ }) {
    log('<HomepageContentPost/> rendered', 3
    );

    const [fileType, setFileType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { submitNewPost } = useContext(PostContext);
    const { createNotification } = useContext(UserContext);
    const postModal = useRef();
    const inputRef = useRef();

    function showPostModal(type) {
        setFileType(type);
        postModal.current.open();
    }

    function resetModal() {
        postModal.current.close();
    }

    async function handleSendClick() {
        const inputData = inputRef.current.value;
        if (inputData === "" | undefined) {
            createNotification("Input field cannot be empty", 'error');
            return;
        }
        setIsLoading(true);
        const response = await submitNewPost([], 'text', inputData);
        if (response.status === 200) {
            inputRef.current.value = '';
            setIsLoading(false);
            createNotification('Post created!', 'success');
        }
    }

    return (
        <>
            <ModalContainer onReset={resetModal} ref={postModal} >
                <PostModal fileType={fileType} closeModal={resetModal} />
            </ModalContainer>
            <section className="newPost">
                <div className="top">
                    <div className="profile">
                        <div className="profile-photo">
                            <ProfileImage />
                        </div>
                        <div className="post-input">
                            <input
                                id='post-input'
                                ref={inputRef}
                                type="text"
                                placeholder='Type something...'
                                onKeyUp={(e) => {
                                    e.key === "Enter" && handleSendClick()
                                }}
                            />
                        </div>
                        <div className="post-submit">
                            <button onClick={handleSendClick}>
                                {isLoading ?
                                    <ReactLoading type={'spin'} width={'1.6rem'} height={'1.6rem'} className={"loader"} />
                                    :
                                    <FaTelegramPlane className='send-icon' />
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={() => showPostModal('image')}>
                        {/* <FaRegImages className='button-icon' /> */}
                        <img src="/Icons/image-2.svg" alt="image icon" />
                        {/* <ImageIcon /> */}
                        <p>Image</p>
                    </button>
                    <button onClick={() => showPostModal('video')}>
                        {/* <MdOutlineVideoLibrary className='button-icon' /> */}
                        <img src="/Icons/video-2.svg" alt="video icon" />
                        <p>Video</p>
                    </button>
                    <button onClick={() => showPostModal('document')}>
                        {/* <IoDocumentsOutline className='button-icon' /> */}
                        <img src="/Icons/document-2.svg" alt="Document icon" />
                        <p>Document</p>
                    </button>
                </div>
            </section>
        </>
    )
}