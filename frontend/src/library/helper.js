import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL
    }
);



const titleToSlug = (title) => {
    return title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Mobile Phone // mobile-phone
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}


// this function is used in created at to convert time in days format 

const timeAgo = (dataString) => {
    const date = new Date(dataString);
    // console.log(date)
    const now = new Date()

    // console.log(now)
    date.setHours(0, 0, 0, 0)
    // console.log(date.setHours(0, 0, 0, 0))
    now.setHours(0, 0, 0, 0);
    // console.log(now.setHours(0, 0, 0, 0));

    const diffTime = Math.abs(now - date);
    // console.log(diffTime);

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays);


    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "Yesterday";
    } else {
        return `${diffDays} days ago`
    }
}

function capitalizeWords(str) {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}


const getKeyByValue = (object, value) => {
    return Object.entries(object).find(([key, val]) => val === value)?.[0];
};

export { titleToSlug, timeAgo, axiosInstance ,formatDate, capitalizeWords, getKeyByValue};