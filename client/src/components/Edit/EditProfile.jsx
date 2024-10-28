import { useContext, useRef, useState } from "react"
import { UserContext } from "../../context/UserContext"
import NavigateBack from "../UI components/NavigateBack";
import UserProfileImage from "../Posts/UserProfileImage";
import EditStudentProfile from "./EditStudentProfile";
import EditAlumniProfile from "./EditAlumniProfile";
import EditFacultyProfile from "./EditFacultyProfile";
import "../../sass/pages/_editProfile.scss";
import Input from "../UI components/Input";

export default function EditProfile() {
    const { createNotification, userDetail, updateProfile } = useContext(UserContext);

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [editedInfo, setEditedInfo] = useState()

    const inputRef = useRef();


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
            event.target.value = null;
        }
    };

    return (
        <>
            <section className="profile">
                <div className="profile__cont">
                    <div className="profile__head">
                        <NavigateBack />
                        <h1>Edit profile</h1>
                        {/* <hr /> */}
                    </div>
                    <div className="profile__main">
                        <div className="profile__left u-margin-bottom-s_small">
                            <div className="profile-image">
                                <div className="image-cont">
                                    {file ? (
                                        <img src={fileUrl} className="preview-image u-medium-length-image" alt="Selected Image" />
                                    ) : (
                                        <UserProfileImage profileSrc={userDetail.avatar} className={'u-medium-length-image '} />
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        ref={inputRef}
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                    />
                                    {/* <button className="u-button-secondary u-button-secondary-1 u-no-margin" onClick={() => inputRef.current.click()}>Select Image</button> */}
                                </div>
                            </div>
                            <div className="section-info">
                                <div className="user-info u-margin-bottom-s_small">
                                    <div className="user-info-name u-bold">
                                        {userDetail.firstName + ' ' + userDetail.lastName}
                                    </div>
                                    <div className="u-light">
                                        {/* <div className="user-info-cell">
                                            {userDetail.headline}
                                        </div>
                                        <div className="user-info-cell">
                                            {userDetail.}
                                        </div> */}
                                    </div>
                                </div>
                                <div className="edit-profile-cont">
                                    <button className="u-button-secondary u-button-secondary-1 u-margin-bottom-s_small" onClick={() => inputRef.current.click()}>
                                        Select new image
                                    </button>
                                    <div className="edit-headline u-margin-bottom-s_small">
                                        <div className="input-cell">
                                            <div className="edit-label">
                                                Headline
                                            </div>
                                            <Input
                                                key={userDetail.headline}
                                                // wrapper_class="u-margin-bottom-ss_small"
                                                className={`edit-input ${userDetail.headline === "" ? 'invalid' : 'valid'}`}
                                                // labelText={field.label}
                                                // placeholder={field.label}
                                                name={'headline'}
                                                value={userDetail.headline || ''}
                                                onChange={(e) => {console.log(e)}}
                                                type={'string'}
                                                errorText={''}
                                                
                                            />
                                        </div>
                                    </div>
                                    {/* <button className="u-button-primary u-btn-square" >
                                        Save
                                    </button> */}
                                </div>
                            </div>
                        </div>
                        <div className="profile__right">
                            {
                                userDetail.role === 'STUDENT' ? (
                                    <EditStudentProfile key={"STUDENT"} />
                                ) : userDetail.role === 'ALUMNI' ? (
                                    <EditAlumniProfile key={"ALUMNI"} />
                                ) : userDetail.role === 'FACULTY' ? (
                                    <EditFacultyProfile key={"FACULTY"} />
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}