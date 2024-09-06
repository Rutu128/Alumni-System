export default function NewInput({type, value, name, setValue, placeholder, label, error}){
    return (
        <div className="input-primary">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type} 
                value={value} 
                name={name} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder={placeholder} 
            />
            {error && <p>{error}</p>}
        </div>
    )

}