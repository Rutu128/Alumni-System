const AlumniDataStructure = {
    status: "",
    c_id: "",
    batch: "",
    college: "",
    branch: "",
    degrees: [],
    workExperience: [],
};

export const alumniInputs = [
    { name: "status", label: "Status", type: "text" },
    { name: "c_id", label: "College ID", type: "text" },
    { name: "batch", label: "Batch", type: "dropdown", values: [2010, 2024], generateYears: true, select_arrow_class: "select-arrow-edit"},
    { name: "college", label: "College", type: "dropdown", type: "dropdown", values: ["CSPIT", "DEPSTAR"], select_arrow_class: "select-arrow-edit"},
    { name: "branch", label: "Branch", type: "dropdown", values: ["CE", "IT", "CSE", "EC", "Civil", "Mechanical", "Electrical"], select_arrow_class: "select-arrow-edit"},
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

// const AlumniDataStructure = {
//     batch: "",
//     college: "",
//     branch: "",
//     status: "",
//     c_id: "",
//     currentInfo: {
//         currentJob: "",
//         currentCompany: "",
//         currentPosition: "",
//         currentCollege: "",
//         currentDegree: "",
//         currentYear: "",
//         currentMajor: "",
//     },
//     degrees: [{
//         degree: "",
//         major: "",
//         year: "",
//         college: "",
//     }],
//     workExperience: [{
//         Role: "",
//         companyName: "",
//         duration: "",
//         location: "",
//     }],
// };