// import axios from "axios";

// export default async function uploadFiles(files, type) {
//     if (!files || files.length === 0) {
//         return [];
//     }

//     const uploadPromises = files.map(file => uploadFile(file, type));
//     const fileUrls = await Promise.all(uploadPromises);

//     return fileUrls;
// }

// async function uploadFile(file, type) {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'alumni_sys_preset');
//     formData.append('cloud_name', 'dp6lbnxpa');
    
//     try {
//         const response = await axios.post(
//             `https://api.cloudinary.com/v1_1/dp6lbnxpa/${type}/upload`,
//             formData,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 withCredentials: false,
//             }
//         );
//         console.log(response.data.secure_url);
//         return {
//             url: response.data.secure_url,
//         };
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         return {
//             fileUrl: null,
//         };
//     }
// }

import axios from "axios";

export default async function uploadFiles(files) {
    if (!files || files.length === 0) {
        return [];
    }

    const uploadPromises = files.map(file => uploadFile(file));
    const fileUrls = await Promise.all(uploadPromises);

    return fileUrls;
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'alumni_sys_preset');
    
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dp6lbnxpa/auto/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false,
            }
        );
        console.log(response.data.secure_url);
        return {
            url: response.data.secure_url,
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        return {
            fileUrl: null,
        };
    }
}
