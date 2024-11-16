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
            return `${diffDays+1} d`;
        } else if (diffDays < 365) {
            return `${diffMonths} mo`;
        } else {
            return `${diffYears} y`;
        }
    }
}

export function formatDate2(dateString) {
    const date = new Date(dateString);

    // Get the day, month, and year components
    const day = date.getUTCDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Function to add ordinal suffix to the day
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`; // Special case for 11th-13th
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    return `${getOrdinalSuffix(day)} ${month}, ${year}`;
}

// Example usage
// const dateString = "2024-10-02T04:12:14.185Z";
// console.log(formatDate(dateString));  // Output: "2nd October, 2024"


// // Example usage:
// console.log(formatDateWithTimestamp('2024-06-28T12:34:56Z'));
// console.log(formatDateWithTimestamp(new Date().toISOString()));
// console.log(formatDateWithTimestamp(new Date(Date.now() - 3600000).toISOString())); // 1 hour ago
// console.log(formatDateWithTimestamp(new Date(Date.now() - 86400000).toISOString())); // 1 day ago
// console.log(formatDateWithTimestamp(new Date(Date.now() - 2592000000).toISOString())); // 30 days ago
// console.log(formatDateWithTimestamp(new Date(Date.now() - 31536000000).toISOString())); // 1 year ago
