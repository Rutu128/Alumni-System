import { useContext, useRef, useState } from "react"
import { UserContext } from "../../context/UserContext"
import NavigateBack from "./NavigateBack";
import UserProfileImage from "../Posts/UserProfileImage";

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
                        <div className="profile__left">
                            <div className="profile-image">
                                {file ? (
                                    <img src={fileUrl} className="preview-image u-full-length-image" alt="Selected Image" />
                                ) : (
                                    <UserProfileImage profileSrc={userDetail.avatar} className={'full-length-image '} />
                                )}
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={inputRef}
                                    accept=".jpg, .jpeg, .png"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <button className="u-button-secondary u-button-secondary-1 u-no-margin" onClick={() => inputRef.current.click()}>Select Image</button>
                            <div className="section-info">
                                <div className="user-info">
                                    <div className="user-info-name u-bold">
                                        {userDetail.firstName + ' ' + userDetail.lastName}
                                    </div>
                                    <div className="u-light">
                                        <div className="user-info-cell">
                                            {userDetail.headline}
                                        </div>
                                        {/* <div className="user-info-cell">
                                            {userDetail.}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__right">

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}