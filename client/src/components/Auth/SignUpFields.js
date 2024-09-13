export const SignUpFields = [
    [
        { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First name', error: '' },
        { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last name', error: '' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'E-mail', error: '' },
    ], [
        { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: 'date of birth', error: '' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'password', error: '' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', error: '' },
    ],[
        { name: 'designation', label: 'Designation', type: 'text', placeholder: 'designation', error: '' },
        { name: 'college', label: 'College', type: 'text', placeholder: 'college', error: '' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'department', error: '' },
    ],[
        { name: 'status', label: 'Status', type: 'text', placeholder: 'status', error: '' },
        { name: 'company', label: 'Company', type: 'text', placeholder: 'company', error: '' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'location', error: '' }
    ]
]

export const designations = [
    "Student",
    "Alumni",
    "Faculty"
]