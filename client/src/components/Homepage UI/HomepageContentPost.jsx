import Input from '../UI components/Input';
import { FaTelegramPlane } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ProfileImage from './ProfileImage';

export default function HomepageContentPost({ profileImg }) {
    const { userDetail } = useContext(UserContext);
    let initials = userDetail.firstName[0] + userDetail.lastName[0];

    return (
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
                <button>
                    <FaRegImages className='button-icon' />
                    <p>Image</p>
                </button>
                <button>
                    <MdOutlineVideoLibrary className='button-icon' />
                    <p>Video</p>
                </button>
                <button>
                    <IoDocumentsOutline className='button-icon' />
                    <p>Document</p>
                </button>
            </div>
        </section>

    )
}