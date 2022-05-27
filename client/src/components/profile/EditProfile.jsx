import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const EditProfile = ({ setEdit }) => {

    const { currentUser } = useSelector(store => store.currentUser)
    const [avatar, setAvatar] = useState("")
    const [userData, setUserData] = useState({ fullName: "", mobile: "", story: "", gender: "", address: "" })
    const { fullName, mobile, story, gender, address } = userData

    const handleAvatar = () => { }

    const handleInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    console.log(userData);

    return (
        <div className="edit_profile">
            <button onClick={() => setEdit(false)} className="btn btn-danger btn_close">Close</button>
            <form >
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : currentUser.avatar} alt="avatar" />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_upload"
                            accept="image/*" onChange={handleAvatar}
                        />
                    </span>
                </div>
                <div className="form_group">
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

                <div className="form_group">
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
                <div className="form_group">
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
                <div className="form_group">
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
