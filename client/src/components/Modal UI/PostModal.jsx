import { useRef, useState } from 'react';
import uploadFiles from '../../utils/UploadImage';
import { PiX } from "react-icons/pi";

export default function PostModal({ fileType, closeModal }) {
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [cloudUrl, setCloudUrl] = useState([]);
    const inputRef = useRef();

    let acceptFormats;
    if(fileType.toLowerCase() === 'image') {
        acceptFormats = '.jpg, .jpeg, .png';
    }
    else if(fileType.toLowerCase() === 'video') {
        acceptFormats = '.mp4, .mkv';
    }
    else if(fileType.toLowerCase() === 'document') {
        acceptFormats = '.pdf';
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
        let cloudUrls = await uploadFiles(file, fileType);
        setCloudUrl(cloudUrls);
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
                            <source src={fileUri} type={file.type}  />
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
                    <div className="description-box">
                        <textarea name="description" id="post-description" placeholder='Describe your post...' />
                    </div>
                    <button className="submit-button" onClick={handleFileSubmit}>Submit Post</button>
                </div>
            </div>
        </div>
    );
}
