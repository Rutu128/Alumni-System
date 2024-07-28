import { format, parseISO, isValid } from 'date-fns';

// Function to get the ordinal suffix for a day
const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const formatDate = (dateString, includeYear = true) => {
    try {
        const date = parseISO(dateString);

        if (!isValid(date)) {
            throw new Error('Invalid date');
        }

        const day = getOrdinal(date.getDate());
        const month = format(date, 'MMMM');
        const year = format(date, 'yyyy');

        return includeYear ? `${day} ${month}, ${year}` : `${day} ${month}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};
