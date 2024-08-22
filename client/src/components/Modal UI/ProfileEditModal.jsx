import { useContext, useRef, useState } from 'react';
import { PiX } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import ReactLoading from 'react-loading';
import ProfileImage from '../Homepage UI/ProfileImage';
import { uploadFile } from '../../utils/Uploads/UploadImage';

export default function ProfileEditModal({ closeModal }) {
    const { createNotification, userDetail, updateProfile } = useContext(UserContext);

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [about, setAbout] = useState(userDetail.description);
    const [designation, setDesignation] = useState(userDetail.designation);
    const [headline, setHeadline] = useState(userDetail.headline);
    const [isLoading, setIsLoading] = useState(false);


    const inputRef = useRef();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
            event.target.value = null;
        }
    };

    async function handleFileSubmit() {
        setIsLoading(true);

        if(file){
            const profile_url = await uploadFile(file);
            console.log(profile_url);
        }
        
        const response = await updateProfile({ avatar: (file ? profile_url.url : null), description: about, designation, headline });

        setIsLoading(false);
        if(response.status === 200){
            createNotification('Profile updated successfully!', 'success');
            closeModal();
        } else {
            return;
        }
    }

    function handleCloseModal() {
        setFile(null);
        setFileUrl(null);
        setAbout('');
        setDesignation('');
        closeModal();
    }

    return (
        <div className="post-container">
            <div className="post-head">
                <h1>Edit profile</h1>
                <button className='post-head-close' onClick={handleCloseModal}><PiX className='post-head-icon' /></button>
            </div>
            <div className="post-body">
                <div className="part-left">
                    <div className="left-body">
                        <div className="image-container u-padding-small">
                            {file ? (
                                <img src={fileUrl} className="preview-image u-full-length-image" alt="Selected Image" />
                            ) : (
                                <ProfileImage className={"preview-image u-full-length-image"} />
                            )}
                        </div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            ref={inputRef}
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                        />
                    </div>
                    <button className="select-button u-no-margin" onClick={() => inputRef.current.click()}>Select Image</button>
                </div>
                <div className="part-right">
                    <div className="right-body">
                        <h2>About:</h2>
                        <div className="u-description-box">
                            <textarea
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                name="about"
                                id="about"
                                placeholder="Enter about..."
                                className='u-post-description'
                            />
                        </div>
                        <h2>Designation:</h2>
                            <input
                                type="text"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                name="designation"
                                id="designation"
                                placeholder="Enter designation..."
                                className='u-input-primary'
                            />
                        <h2>Headline:</h2>
                            <input
                                type="text"
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                name="headline"
                                id="headline"
                                placeholder="Enter Headline..."
                                className='u-input-primary'
                            />
                    </div>
                    <button className="u-button-primary u-flex-justify-center" onClick={handleFileSubmit}>
                        {isLoading ?
                            <ReactLoading type={'spin'} width={'1.6rem'} height={'1.6rem'} className={"loader"} />
                            :
                            'Submit'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
