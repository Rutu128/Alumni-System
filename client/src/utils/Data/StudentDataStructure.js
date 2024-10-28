const StudentDataStructure = {
    c_id: "",
    c_email: "",
    batch: "",
    college: "",
    branch: "",
};

export const studentInputs = [
    {name: "c_id", label: "College ID", type: "text"},
    {name: "c_email", label: "College Email", type: "email"},
    {name: "batch", label: "Batch year", type: "dropdown", values: [2010, 2024], generateYears: true, select_arrow_class: "select-arrow-edit"},
    {name: "college", label: "College", type: "dropdown", values: ["CSPIT", "DEPSTAR"], select_arrow_class: "select-arrow-edit"},
    {name: "branch", label: "Branch", type: "dropdown", values: ["CE", "IT", "CSE", "EC", "Civil", "Mechanical", "Electrical"], select_arrow_class: "select-arrow-edit"},
]

export default StudentDataStructure;