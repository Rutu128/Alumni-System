import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

function TextEditor({text, setText}) {
    // const [text, setText] = useState('');
    const maxChars = 500; // Set your character limit here

    const handleTextChange = (newText) => {
        if (newText.length <= maxChars) {
            setText(newText);
        }
    };

    return (
        <div className='u-text-editor'>
            <ReactQuill value={text} onChange={handleTextChange} />
            <div className="char-count">
                {text.length}/{maxChars} characters
            </div>
        </div>
    );
}

export default TextEditor;


// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';

// export default function TextEditor({ setText }) {
//     const { quill, quillRef } = useQuill();

//     useEffect(() => {
//         if (quill) {
//             quill.on('text-change', () => {
//                 // console.log('Text change!');
//                 // console.log(quill.getText()); // Get text only
//                 // console.log(quill.getContents()); // Get delta contents
//                 // console.log(quill.root.innerHTML); // Get innerHTML using quill
//                 // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
//                 if (quill.getText().length > 500) {
//                     quill.deleteText(500, quill.getText().length);
//                 } else {
//                     setText(quill.root.innerHTML);
//                 }
//             });
//         }
//     }, [quill]);

//     return (
//         <div className='quill'>
//             <div ref={quillRef} />

//             <div id="toolbar">
//                 <select className="ql-size">
//                     <option value="small" />
//                     <option value="large" />
//                     <option value="huge" />
//                 </select>
//                 <button className="ql-bold" />
//                 <button className="ql-script" value="sub" />
//                 <button className="ql-script" value="super" />
//             </div>
//             <div id="editor" />
//         </div>
//     );
// };