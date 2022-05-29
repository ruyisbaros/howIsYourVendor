import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeProfileStatus } from '../../redux/profileSlicer';

const StatusModal = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()

    const [content, setContent] = useState("")
    const [images, setImages] = useState([])

    return (
        <div className="status_modal">
            <form >
                <div className="status_header">
                    <h5 className="m-0">Create a New Post</h5>
                    <span onClick={() => dispatch(closeProfileStatus())}>&times;</span>
                </div>
                <div className="status_body">
                    <textarea name="content"
                        placeholder={`${currentUser.username.toUpperCase()}, give a short explain about your Vendor `}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <span>{content.length}/400</span>
                    <div className="input_images">
                        <i className="fas fa-camera"></i>
                        <div className="file_upload">
                            <i className="fas fa-image"></i>
                            <input type="file"
                                name="file" id="file" multiple
                                accept="image/*"

                            />
                        </div>
                    </div>
                </div>
                <div className="status_footer">
                    <button className="btn btn-primary w-100">Post</button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal