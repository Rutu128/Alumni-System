import { useContext, useRef, useState } from 'react';
import uploadFiles from '../../utils/Uploads/UploadImage';
import { PiX } from "react-icons/pi";
import { PostContext } from '../../context/PostContext';
import ReactLoading from 'react-loading';
import { UserContext } from '../../context/UserContext';
import TextEditor from '../UI components/TextEditor';
import React from 'react';


export default function PostModal({ fileType, closeModal }) {
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [description, setDescription] = useState('');

    const { submitNewPost } = useContext(PostContext);
    const { createNotification } = useContext(UserContext);

    const inputRef = useRef();
    const descriptionRef = useRef();

    let acceptFormats;
    if (fileType.toLowerCase() === 'image') {
        acceptFormats = '.jpg, .jpeg, .png';
    }
    else if (fileType.toLowerCase() === 'video') {
        acceptFormats = '.mp4, .mkv';
    }
    else if (fileType.toLowerCase() === 'document') {
        acceptFormats = 'application/pdf';
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(prevFiles => [...prevFiles, selectedFile]);
            setFileUrl(prevURL => [...prevURL, URL.createObjectURL(selectedFile)]);
            // Reset input value to allow re-selecting the same file
            event.target.value = null;
        }
    };

    const handleRemoveFile = (index) => {
        setFile(prevFiles => prevFiles.filter((_, i) => i !== index));
        setFileUrl(prevURL => prevURL.filter((_, i) => i !== index));
    };

    async function handleFileSubmit() {
        if (file.length === 0 && descriptionRef.current.value === (null || undefined || "")) {
            createNotification('Empty fields!', 'error');
            return;
        }
        setIsLoading(true);

        const response = await submitNewPost(file, fileType, descriptionRef.current.value);
        console.log(response);
        if (response.status === 200) {
            createNotification('Post created!', 'success');
            handleCloseModal();
            setIsLoading(false);
        }
    }

    const renderFilePreviews = () => {
        if (file.length === 0) {
            return <p className="no-files-message">No files selected.</p>;
        }

        return file.map((file, index) => {
            const fileType = file.type.split('/')[0];
            const fileUri = fileUrl[index];

            return (
                <div className="preview-wrapper" key={index}>
                    <button className="remove-file" onClick={() => handleRemoveFile(index)}>
                        <PiX className='post-head-icon' />
                    </button>
                    {fileType === 'image' ? (
                        <img src={fileUri} alt={`Selected ${index}`} />
                    ) : fileType === 'video' ? (
                        <video controls>
                            <source src={fileUri} type={file.type} />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <embed src={fileUri} type="application/pdf" />
                    )}
                </div>
            );
        });
    };

    function handleCloseModal() {
        setFile([]);
        setFileUrl([]);
        closeModal();
    }

    return (
        <div className="post-container">
            <div className="post-head">
                <h1>Create a new Post</h1>
                <button className='post-head-close' onClick={handleCloseModal}><PiX className='post-head-icon' /></button>
            </div>
            <div className="post-body">
                <div className="part-left">
                    {file.length !== 0 && <h2>Selected Files:</h2>}
                    <div className="post-file-preview">
                        <div className="sliding-preview">
                            {renderFilePreviews()}
                        </div>
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={inputRef}
                        accept={acceptFormats}
                        style={{ display: 'none' }}
                    />
                    <button className="select-button" onClick={() => inputRef.current.click()}>Select {fileType}s</button>
                </div>
                <div className="part-right">
                    <h2>Description:</h2>
                    <div className="u-description-box">
                        <textarea ref={descriptionRef} name="description" id="post-description" className='u-post-description' placeholder='Describe your post...' />
                        {/* <TextEditor text={description} setText={setDescription} /> */}
                        {/* <TextEditor text={description} setText={setDescription} /> */}
                    </div>
                    <button className="submit-button" onClick={handleFileSubmit}>
                        {isLoading ?
                            <ReactLoading type={'spin'} width={'1.6rem'} height={'1.6rem'} className={"loader"} />
                            :
                            'Submit post'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
