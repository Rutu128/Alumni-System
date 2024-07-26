import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploadedFile, setUploadedFile] = useState();

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleFileSubmit = async () => {
        if(!file){
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'alumni_sys_preset');
        formData.append('cloud_name', 'dp6lbnxpa'); // replace with your upload preset

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dp6lbnxpa/image/upload', // replace with your cloud name
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false, // ensure withCredentials is false
            }
            );
            console.log(response.data.secure_url);
            setFileUrl(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const renderFilePreview = () => {
        if (!file) return null;

        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
            return <img src={fileUrl} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />;
        } else if (fileType === 'video') {
            return (
                <video controls style={{ maxWidth: '100%', height: 'auto' }}>
                    <source src={fileUrl} type={file.type} />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return <p>Unsupported file type.</p>;
        }
    };


    return (
        <div>
            {renderFilePreview()}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileSubmit}>Submit file</button>
        </div>
    );
};

export default FileUpload;
