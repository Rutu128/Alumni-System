import axios from "axios";
export default async function uploadFiles(files, type){
    const fileUrl = [];
    if(!files){
        return;
    }
    else if (files.length > 0){
        await files.forEach(file => {
            let url = uploadFile(file, type);
            fileUrl.push(url);
        });
    }

    return fileUrl;
};

async function uploadFile(file, type){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'alumni_sys_preset');
    formData.append('cloud_name', 'dp6lbnxpa'); // replace with your upload preset
    
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dp6lbnxpa/${type}/upload`, // replace with your cloud name
            formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: false, // ensure withCredentials is false
        }
        );
        console.log(response.data.secure_url);
        return {
            fileUrl: response.data.secure_url,
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}