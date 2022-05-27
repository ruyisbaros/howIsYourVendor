import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { updateCurrentUser } from '../../redux/authSlicer'

const EditProfile = ({ setEdit }) => {

    const { currentUser } = useSelector(store => store.currentUser)
    const { token } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(currentUser.avatar)
    const [userData, setUserData] = useState({ fullName: "", mobile: "", story: "", gender: "", address: "" })
    const { fullName, mobile, story, address, gender } = userData

    useEffect(() => {
        setUserData(currentUser)
    }, [currentUser])

    const handleAvatar = async (e) => {

        try {
            const file = e.target.files[0]
            //console.log(file);
            if (!file) return alert("Please select an image")
            if (file.size > 1024 * 1024) return alert("Your file is too large (max 1mb allowed)")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("Only jpeg, jpg or PNG images are allowed")

            let formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.post("/api/v1/uploads", formData, {
                headers: { "content-type": "multipart/form-data", authorization: token }
            })

            alert("Your file has been uploaded successfully")
            //console.log(data);
            setAvatar(data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    //console.log(avatar);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch("/api/v1/users/profile_update", { fullName, mobile, story, address, gender, avatar }, {
                headers: { authorization: token }
            })
            dispatch(updateCurrentUser(data.updatedUser))
            setEdit(false)
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //console.log(userData);

    return (
        <div className="edit_profile">
            <button onClick={() => setEdit(false)} className="btn btn-danger btn_close">Close</button>
            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar ? avatar.url : "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg"} alt="avatar" />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_upload"
                            accept="image/*" onChange={handleAvatar}
                        />
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <div className="position-relative">
                        <input type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            disabled={fullName.length === 25}
                            value={fullName}
                            className="form-control"
                            onChange={handleInput}
                        />
                        <small className="text-danger position-absolute" style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                            {fullName.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text"
                        name="mobile"
                        id="mobile"
                        placeholder="Mobile"
                        value={mobile}
                        className="form-control"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={address}
                        className="form-control"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="story">Story:</label>
                    <textarea cols="30" rows="4"
                        name="story"
                        id="story"
                        placeholder="Story"
                        value={story}
                        className="form-control"
                        disabled={story.length === 200}
                        onChange={handleInput}
                    />
                    <small className="text-danger d-block text-right mt-3" style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                        {story.length}/200
                    </small>
                </div>
                <label htmlFor="gender">Gender:</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" className="custom-select text-capitalize"
                        onChange={handleInput}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile
