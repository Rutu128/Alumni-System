import { useContext, useState } from "react";
import Input from "../UI components/Input";
import NewInput from "./NewInput";
import { SignUpFields } from "./SignUpFields";
import { SignUpContext } from "../../context/SignUpContext";

export default function Step1({ incrementStep }){
    const {userData, setUserDesignation} = useContext(SignUpContext);
    const [error, setError] = useState('');

    function handleSubmit(){
        if(userData.designation !== '' | undefined){
            incrementStep();
        } else {
            setError('Please select a designation!');
        }
    }

    return (
        <>
            <Input 
                className={`u-margin-bottom-small ${userData.designation === '' || undefined ? 'invalid' : 'valid'}`}
                type="dropdown"
                values={["Student", "Alumni", "Faculty"]}
                generateYears={false}
                labelText={"Select your designation"}
                errorText={error}
                value={userData.designation}
                onChange={(e) =>{
                    console.log(e.target.value);
                    setUserDesignation(e.target.value);
                    setError('');
                }}
                name="designation"
            />
            <button
                type="button"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </>
    )
}

// {SignUpFields[0].map((field, index) => {
//     return (
//         <NewInput  
//             key={index}
//             type={field.type}
//             value={userData[field.name]}
//             name={field.name}
//             setValue={(e) => handleChangeData(e, field.name)}
//             placeholder={field.placeholder}
//             label={field.label}
//             error={field.error}
//         />
//     )
// })}