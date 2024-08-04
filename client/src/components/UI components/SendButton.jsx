import { FaTelegramPlane } from "react-icons/fa";
import ReactLoading from 'react-loading';

export default function SendButton({ isLoading }) {
    return (
        <button className="send-button">
            {isLoading ?
                <ReactLoading type={'spin'} width={'1.6rem'} height={'1.6rem'} className={"loader"} />
                :
                <FaTelegramPlane className='send-icon' />
            }
        </button>
    )
}