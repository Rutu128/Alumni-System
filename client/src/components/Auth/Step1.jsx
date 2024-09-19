import { useContext, useState } from "react";
import Input from "../UI components/Input";
import { designations } from "./SignUpFields";
import { SignUpContext } from "../../context/SignUpContext";

export default function Step1({ error, setError }){
    const {userData, setUserDesignation} = useContext(SignUpContext);
    // const [error, setError] = useState('');


    return (
        <>
            <Input 
                className={`${userData.role === '' || undefined ? 'invalid' : 'valid'}`}
                type="dropdown"
                wrapper_class="u-margin-bottom-small"
                values={designations}
                generateYears={false}
                labelText={"Select your designation"}
                errorText={error.field === 'role' ? error.message : ''}
                value={userData.role}
                onChange={(e) =>{
                    console.log(e.target.value);
                    setUserDesignation(e.target.value);
                    setError({
                        field: '',
                        message: ''
                    });
                }}
                name="role"
            />
            {/* <button
                type="button"
                className="u-button-primary"
                onClick={handleSubmit}
            >
                Submit
            </button> */}
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