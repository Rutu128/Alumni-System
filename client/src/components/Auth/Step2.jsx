import { useContext } from "react";
import Input from "../UI components/Input";
import NewInput from "./NewInput";
import { SignUpFields } from "./SignUpFields";
import { SignUpContext } from "../../context/SignUpContext";

export default function Step2({handleChangeData}){
    const {userData} = useContext(SignUpContext);

    return (
        <>
            {SignUpFields[0].map((field, index) => {
                return (
                    <Input
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