import { useContext, useRef, useState } from 'react';
import { PiX } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import ReactLoading from 'react-loading';
import ProfileImage from '../Homepage UI/ProfileImage';

export default function ProfileEditModal({ closeModal }) {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [about, setAbout] = useState('');
    const [designation, setDesignation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { createNotification } = useContext(UserContext);

    const inputRef = useRef();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
            // Reset input value to allow re-selecting the same file
            event.target.value = null;
        }
    };

    async function handleFileSubmit() {
        if (!file || about.trim() === '' || designation.trim() === '') {
            createNotification('Please fill in all fields!', 'error');
            return;
        }
        setIsLoading(true);

        // Perform your submit logic here

        setIsLoading(false);
        closeModal();
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
                    {file && <h2>Selected Image:</h2>}
                    <div className="u-padding-small">
                        {file ? (
                            <img src={fileUrl}  className="u-full-length-image" alt="Selected Image" />
                        ) : (
                            <ProfileImage className={"u-full-length-image"} />
                        )}
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={inputRef}
                        accept=".jpg, .jpeg, .png"
                        style={{ display: 'none' }}
                    />
                    <button className="select-button" onClick={() => inputRef.current.click()}>Select Image</button>
                </div>
                <div className="part-right">
                    <h2>About:</h2>
                    <div className="description-box">
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            name="about"
                            id="image-about"
                            placeholder="Enter about..."
                            className='u-input-primary'
                        />
                    </div>
                    <h2>Designation:</h2>
                    <div className="description-box">
                        <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            name="designation"
                            id="image-designation"
                            placeholder="Enter designation..."
                            className='u-input-primary'
                        />
                    </div>
                    <button className="u-button-primary" onClick={handleFileSubmit}>
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
