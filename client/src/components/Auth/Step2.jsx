import { useContext, useState } from "react";
import Input from "../UI components/Input";
import { SignUpFields } from "./SignUpFields";
import { SignUpContext } from "../../context/SignUpContext";

export default function Step2({ error, setError }) {
    const { userData, setUserData } = useContext(SignUpContext);
    // const [error, setError] = useState({
    //     field: '',
    //     message: ''
    // });

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
            {SignUpFields[0].map((field, index) => {
                return (
                    <Input
                        key={index}
                        wrapper_class="u-margin-bottom-ss_small"
                        className={`sign-up-input ${userData[field.name] === "" ? 'invalid' : 'valid'}  ${error.field === field.name ? 'error' : ''}`}
                        type={field.type}
                        value={userData[field.name]}
                        name={field.name}
                        onChange={(e) => handleChangeData(e, field.name)}
                        labelText={field.label}
                        errorText={error.field === field.name ? error.message : ''}
                    />
                )
            })}
        </>
    )
}