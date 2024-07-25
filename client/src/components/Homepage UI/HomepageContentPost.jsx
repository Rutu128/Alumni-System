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

export default function HomepageContentPost({ profileImg }) {
    const [fileType, setFileType] = useState('');
    const postModal = useRef();

    function showPostModal(type) {
        setFileType(type);
        postModal.current.open();
    }

    function resetModal() {
        postModal.current.close();
    }

    return (
        <>
            <ModalContainer onReset={resetModal} ref={postModal} >
                <PostModal fileType={fileType} closeModal={resetModal} />
            </ModalContainer>
            <section className="post">
                <div className="top">
                    <div className="profile">
                        <div className="profile-photo">
                            <ProfileImage />
                        </div>
                        <div className="post-input">
                            <input type="text" placeholder='Type something...' />
                        </div>
                        <div className="post-submit">
                            <button>
                                <FaTelegramPlane className='send-icon' />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={() => showPostModal('image')}>
                        <FaRegImages className='button-icon' />
                        <p>Image</p>
                    </button>
                    <button onClick={() => showPostModal('video')}>
                        <MdOutlineVideoLibrary className='button-icon' />
                        <p>Video</p>
                    </button>
                    <button onClick={() => showPostModal('document')}>
                        <IoDocumentsOutline className='button-icon' />
                        <p>Document</p>
                    </button>
                </div>
            </section>
        </>
    )
}