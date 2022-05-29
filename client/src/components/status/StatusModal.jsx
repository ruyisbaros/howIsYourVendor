import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeStatus } from '../../redux/postsSlicer';
import { useEffect } from 'react';


const StatusModal = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const { error } = useSelector(store => store.posts)
    const dispatch = useDispatch()

    const [content, setContent] = useState("")
    const [images, setImages] = useState([])

    const [index, setIndex] = useState(0)
    const [activeImg, setActiveImg] = useState(images[index])
    console.log(index);

    useEffect(() => {
        setActiveImg(images[index])
    }, [index, images])

    const handleImages = async (e) => {
        const files = [...e.target.files]
        let newImages = []
        //console.log(files);

        files.forEach(file => {
            if (!file) return alert("Please select an image")
            if (file.size > 1024 * 1024) return alert("Your file is too large (max 1mb allowed)")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("Only jpeg, jpg or PNG images are allowed")
            /* let formData = new FormData();
            formData.append("file", file); */
            return newImages.push(file)
        })

        setImages([...images, ...newImages])

    }
    console.log(images);

    const deleteImage = (i) => {
        const newArr = [...images]
        newArr.splice(i, 1)
        setImages(newArr)
    }

    const handleStream = () => {

    }
    const handleSubmit = async (e) => { }



    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create a New Post</h5>
                    <span onClick={() => dispatch(closeStatus())}>&times;</span>
                </div>
                <div className="status_body">
                    <textarea name="content"
                        placeholder={`${currentUser.username.toUpperCase()}, give a short explain about your Vendor `}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <span>{content.length}/400</span>
                    <div className="show_images">
                        <div className="sml_img_box">
                            {
                                images.map((img, i) => (
                                    <div key={i} id="file_img" className="file_img">
                                        <img src={URL.createObjectURL(img)} alt="images" onClick={() => setIndex(i)} /* className={i = index && "active_img"} */ />
                                        <span onClick={() => deleteImage(i)} className="times">&times;</span>
                                    </div>
                                ))
                            }
                        </div>
                        {images.length > 0 &&
                            <div className="img_big_box">
                                <img src={activeImg} alt="" />
                            </div>}
                    </div>
                    <div className="input_images">
                        <i className="fas fa-camera" onClick={handleStream}></i>
                        <div className="file_upload">
                            <i className="fas fa-image"></i>
                            <input type="file"
                                name="file" id="file" multiple
                                accept="image/*"
                                onChange={handleImages}
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