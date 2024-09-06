import NewInput from "./NewInput";
import { SignUpFields } from "./SignUpFields";

export default function Step2({userData, handleChangeData}){
    return (
        <>
            {SignUpFields[1].map((field, index) => {
                return (
                    <NewInput  
                        key={index}
                        type={field.type}
                        value={userData[field.name]}
                        name={field.name}
                        setValue={(e) => handleChangeData(e, field.name)}
                        placeholder={field.placeholder}
                        label={field.label}
                        error={field.error}
                    />
                )
            })}
        </>
    )
}