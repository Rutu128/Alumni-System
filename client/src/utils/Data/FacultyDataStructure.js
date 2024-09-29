const FacultyDataStructure = {
    email: "",
    position: "",
    department: "",
    branch: "",
    degrees: [{
        degree: "",
        major: "",
        year: "",
        college: "",
    }],
};

export const facultyInputs = [
    {name: "email", label: "Email", type: "email"},
    {name: "position", label: "Position", type: "text"},
    {name: "branch", label: "Branch", type: "text"},
    {name: "college", label: "College", type: "text"},
];

export const facultyGroupInputs = {
    degrees: [
        {name: "degree", label: "Degree", type: "text"},
        {name: "major", label: "Major", type: "text"},
        {name: "year", label: "Year", type: "text"},
    ]
}

export default FacultyDataStructure;