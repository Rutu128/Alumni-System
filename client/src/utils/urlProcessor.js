// utils.js
export const isImage = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) != null;
export const isVideo = (url) => url.match(/\.(mp4|ogg)$/) != null;
export const isPdf = (url) => url.match(/\.(pdf)$/) != null;

export const getProcessedPdfUrl = (url) => {
    const urlParts = url.split('/');
    const publicId = urlParts[urlParts.length - 1].split('.')[0];
    return `https://res.cloudinary.com/dp6lbnxpa/image/upload/f_auto,q_auto/${publicId}`;
};
