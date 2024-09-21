const AlumniDataStructure = {
    batch: "",
    college: "",
    branch: "",
    status: "",
    currentInfo: {
        currentJob: "",
        currentCompany: "",
        currentPosition: "",
        currentCollege: "",
        currentDegree: "",
        currentYear: "",
        currentMajor: "",
    },
    degrees: [{
        degree: "",
        major: "",
        year: "",
        college: "",
    }],
    workExperience: [{
        Role: "",
        companyName: "",
        duration: "",
        location: "",
    }],
};

export const alumniInputs = [
    { name: "status", label: "Status", type: "text" },
    { name: "batch", label: "Batch", type: "text" },
    { name: "college", label: "College", type: "text" },
    { name: "branch", label: "Branch", type: "text" },
];

export const alumniGroupInputs = {
    employment: [
        { name: "currentJob", label: "Current Job", type: "text" },
        { name: "currentCompany", label: "Current Company", type: "text" },
        { name: "currentPosition", label: "Current Position", type: "text" },
    ],
    studies: [
        { name: "currentCollege", label: "Current College", type: "text" },
        { name: "currentDegree", label: "Current Degree", type: "text" },
        { name: "currentYear", label: "Current Year", type: "text" },
        { name: "currentMajor", label: "Current Major", type: "text" },
    ],
    degrees: [
        { name: "degree", label: "Degree", type: "text" },
        { name: "major", label: "Major", type: "text" },
        { name: "year", label: "Year", type: "text" },
        { name: "college", label: "College", type: "text" },
    ],
    workExperience: [
        { name: "Role", label: "Role", type: "text" },
        { name: "companyName", label: "Company Name", type: "text" },
        { name: "duration", label: "Duration", type: "text" },
        { name: "location", label: "Location", type: "text" },
    ],
}

export default AlumniDataStructure;