const FacultyDataStructure = {
    email: "",
    f_id: "",
    position: "",
    department: "",
    branch: "",
    degrees: [],
};

export const facultyInputs = [
    {name: "f_id", label: "Faculty ID", type: "text"},
    {name: "email", label: "Email", type: "email"},
    {name: "position", label: "Position", type: "text"},
    {name: "branch", label: "Branch", type: "dropdown", values: ["CE", "IT", "CSE", "EC", "Civil", "Mechanical", "Electrical"], select_arrow_class: "select-arrow-edit"},
    {name: "department", label: "Department", type: "dropdown", values: ["CSPIT", "DEPSTAR"], select_arrow_class: "select-arrow-edit"},
];

export const facultyGroupInputs = {
    degrees: [
        {name: "degree", label: "Degree", type: "text"},
        {name: "major", label: "Major", type: "text"},
        {name: "year", label: "Year", type: "text"},
    ]
}

export default FacultyDataStructure;