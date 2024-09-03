import InputEmoji from 'react-input-emoji';


export default function Textarea({ text, setText, placeholder, hasEmojis, ...props }) {
    return (
        <div className="u-textarea">
            <InputEmoji
                value={text}
                inputClass='textarea-input'
                onChange={setText}
                fontFamily='Mona-sans, sans-serif'
                theme='light'
                height='50'
                placeholder={placeholder}
                shouldReturn
                // cleanOnEnter={false}
                keepOpened
            />
        </div>
    )
}