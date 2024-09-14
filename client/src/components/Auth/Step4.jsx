import { useContext } from "react";
import Input from "../UI components/Input";
import { SignUpFields } from "./SignUpFields";
import { SignUpContext } from "../../context/SignUpContext";

export default function Step4({ error, setError }){
    const { userData, setUserData } = useContext(SignUpContext);

    function handleChangeData(e, name) {
        let value = e.target.value;
        if (value !== value.trim()) {
            setError({
                field: name,
                message: 'Spaces are not allowed!'
            })
            return;
        } else {
            setError({
                field: '',
                message: ''
            })
        }

        setUserData(prevData => {
            return {
                ...prevData,
                [name]: value,
            }
        })
    }

    return (
        <>
            {SignUpFields[2].map((field, index) => {
                return (
                    <Input  
                        key={index}
                        wrapper_class={'u-margin-bottom-small'}
                        type={field.type}
                        value={userData[field.name]}
                        name={field.name}
                        onChange={(e) => handleChangeData(e, field.name)}
                        labelText={field.label}
                        errorText={error.field === field.name ? error.message : field.error}
                    />
                )
            })}
        </>
    )
}