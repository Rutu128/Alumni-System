// import { format, parseISO, isValid } from 'date-fns';

// // Function to get the ordinal suffix for a day
// const getOrdinal = (n) => {
//     const s = ["th", "st", "nd", "rd"],
//         v = n % 100;
//     return n + (s[(v - 20) % 10] || s[v] || s[0]);
// };

// export const formatDate = (dateString, includeYear = true) => {
//     try {
//         const date = parseISO(dateString);

//         if (!isValid(date)) {
//             throw new Error('Invalid date');
//         }

//         const day = getOrdinal(date.getDate());
//         const month = format(date, 'MMMM');
//         const year = format(date, 'yyyy');

//         return includeYear ? `${day} ${month}, ${year}` : `${day} ${month}`;
//     } catch (error) {
//         console.error('Error formatting date:', error);
//         return 'Invalid date';
//     }
// };

export function formatDate(inputDate) {
    const currentDate = new Date();
    const providedDate = new Date(inputDate);

    const diffTime = Math.abs(currentDate - providedDate);
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30); // approximate
    const diffYears = Math.floor(diffDays / 365); // approximate

    const sameDay = currentDate.toDateString() === providedDate.toDateString();

    if (sameDay) {
        if (diffSeconds < 60) {
            return `${diffSeconds} s`;
        } else if (diffMinutes < 60) {
            return `${diffMinutes} min`;
        } else {
            return `${diffHours} hr`;
        }
    } else {
        if (diffDays < 30) {
            return `${diffDays} d`;
        } else if (diffDays < 365) {
            return `${diffMonths} mo`;
        } else {
            return `${diffYears} y`;
        }
    }
}

// // Example usage:
// console.log(formatDateWithTimestamp('2024-06-28T12:34:56Z'));
// console.log(formatDateWithTimestamp(new Date().toISOString()));
// console.log(formatDateWithTimestamp(new Date(Date.now() - 3600000).toISOString())); // 1 hour ago
// console.log(formatDateWithTimestamp(new Date(Date.now() - 86400000).toISOString())); // 1 day ago
// console.log(formatDateWithTimestamp(new Date(Date.now() - 2592000000).toISOString())); // 30 days ago
// console.log(formatDateWithTimestamp(new Date(Date.now() - 31536000000).toISOString())); // 1 year ago
