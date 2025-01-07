export const JobInputs = [
    {
        name: 'title',
        type: 'text',
        label: 'Title',
    },
    {
        name: 'description',
        type: 'textarea',
        label: 'Description',
    },
    {
        name: 'location',
        type: 'text',
        label: 'Location',
    },
    {
        name: 'salary',
        type: 'number',
        label: 'Salary',
    },
    {
        name: 'requirements',
        type: 'text',
        label: 'Requirements',
    },
    {
        name: 'type',
        type: 'dropdown',
        label: 'Type',
        values: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Commission', 'Volunteer', 'Remote'],
        select_arrow_class: "select-arrow-edit"
    },
    {
        name: 'status',
        type: 'text',
        label: 'Status',
    },
    {
        name: 'remote',
        type: 'checkbox',
        label: 'Remote',
    },
    {
        name: 'company',
        type: 'text',
        label: 'Company',
    },
    // {
    //     name: 'createdAt',
    //     type: 'date',
    //     label: 'Created At',
    // },
    // {
    //     name: 'updatedAt',
    //     type: 'date',
    //     label: 'Updated At',
    // }
]

export const jobDataStructure = {
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    type: "",
    status: "",
    remote: false,
    company: "",
}