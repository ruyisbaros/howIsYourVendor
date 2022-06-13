import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeStatus, PostCreateEnd, PostCreateFail, PostCreateStart, PostCreateSuccess, postUpdateDone } from '../../redux/postsSlicer';
import { toast } from "react-toastify"
import loadingImg from "../../images/loading-2.gif"
import axios from 'axios';
import { createNewNotification } from '../../redux/notifySlicer';

const StatusModal = () => {
    const { currentUser, token, socket } = useSelector(store => store.currentUser)
    const { profilePostFetching, onEdit, targetOfUpdatePost } = useSelector(store => store.posts)
    const dispatch = useDispatch()
    const videoRef = useRef()
    const canvasRef = useRef()
    const [tracks, setTracks] = useState("")

    const [content, setContent] = useState("")
    const [images, setImages] = useState([])
    const [stream, setStream] = useState(false)

    const [index, setIndex] = useState(0)
    const [activeImg, setActiveImg] = useState(images[index])


    //console.log('target', targetOfUpdatePost);
    //console.log(images);
    useEffect(() => {
        setActiveImg(images[index])
    }, [index, images])

    let newImages = []
    const imageUpload = async (dt) => {
        dispatch(PostCreateStart())
        const { data } = await axios.post("api/v1/uploads", dt, {
            headers: { "content-type": "multipart/form-data", authorization: token }
        })
        newImages.push(data)

        setImages([...images, ...newImages])
        dispatch(PostCreateEnd())
    }
    //console.log(images);
    const handleImages = async (e) => {
        const files = [...e.target.files]

        //console.log(files);

        await files.forEach(file => {
            if (!file) return alert("Please select an image")
            if (file.size > 1024 * 1024 * 5) return alert("Your file is too large (max 1mb allowed)")
            if (file.type !== "image/jpeg" && file.type !== "video/mp4" && file.type !== "image/png") return alert("Only jpeg, jpg or PNG images are allowed")
            let formData = new FormData();
            formData.append("file", file);
            imageUpload(formData)

        })



    }
    //console.log(images);

    const deleteImage = (i) => {
        const newArr = [...images]
        newArr.splice(i, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(ms => {
                    videoRef.current.srcObject = ms;
                    videoRef.current.play();
                    const track = ms.getTracks()
                    setTracks(track[0])

                }).catch(err => console.error(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        canvasRef.current.setAttribute("width", width)
        canvasRef.current.setAttribute("height", height)
        const ctx = canvasRef.current.getContext("2d")
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = canvasRef.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStop = () => {
        tracks.stop()
        setStream(false)
    }

    //NOTIFIES

    const createNotify = async (ntfy) => {
        const { data } = await axios.post("api/v1/notifications/new", { ...ntfy }, {
            headers: { authorization: token }
        })
        //dispatch(createNewNotification(data))

        //socket
        socket.emit("createPostNotify", { ...data })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(PostCreateStart())
            if (images.length === 0) return toast.error("Please select-add images")
            if (content.length === 0) return toast.error("Please text your comments")
            if (onEdit) { //Update post
                const { data } = await axios.patch(`/api/v1/posts/update/${targetOfUpdatePost._id}`, { content, images }, {
                    headers: { authorization: token }
                })
                toast.success("Your post has been updated successfully")
                dispatch(postUpdateDone())
                setContent("")
                setImages([])
            } else { //Create Post
                const { data } = await axios.post("/api/v1/posts/new", { content, images }, {
                    headers: { authorization: token }
                })
                //console.log(data);
                dispatch(PostCreateSuccess(data))
                toast.success("Your post has been created successfully")
                setContent("")
                setImages([])
                if (tracks) tracks.stop();

                //for Notifies

                const notify = {
                    id: data._id,
                    text: `${data.owner.username} added a new post`,
                    recipients: data.owner.followers,
                    content: data.content,
                    url: `/post/${data._id}`,
                    image: data.images[0].url
                }
                createNotify(notify)
            }
        } catch (error) {
            toast.error("error.response.data.message")
            dispatch(PostCreateFail())
        }
    }

    useEffect(() => {
        if (onEdit) {
            setContent(targetOfUpdatePost.content)
            setImages(targetOfUpdatePost.images)
        }
    }, [onEdit, targetOfUpdatePost])


    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">{onEdit ? "Update selected Post" : "Create a New Post"}</h5>
                    <span onClick={() => dispatch(closeStatus())}>&times;</span>
                </div>
                <div className="status_body">
                    <textarea name="content"
                        placeholder={`${currentUser.username.toUpperCase()}, give a short explain about your Vendor `}
                        value={content} resize="none"
                        onChange={e => setContent(e.target.value)}
                    />
                    <span>{content.length}/400</span>
                    <div className="show_images">
                        {profilePostFetching && <img src={loadingImg} alt="loading" className="d-block mx-auto" />}
                        <div className="sml_img_box">
                            {
                                images.map((img, i) => (
                                    <div key={i} id="file_img" className="file_img">
                                        <img src={img?.url} alt="images" onClick={() => setIndex(i)} /* className={i = index && "active_img"} */ />
                                        <span onClick={() => deleteImage(i)} className="times">&times;</span>
                                    </div>
                                ))
                            }
                            {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi est quos recusandae dolorum facere enim eaque, quasi modi voluptatibus possimus. */}
                        </div>
                        {images.length > 0 &&
                            <div className="img_big_box">
                                <img src={activeImg?.url} alt="" />
                            </div>}
                    </div>

                    {
                        stream &&
                        <div className="video-stream position-relative">
                            <video autoplay muted ref={videoRef} width="100%" height="100%" style={{ filter: "invert(1)" }} />
                            <span onClick={handleStop}>&times;</span>
                            <canvas ref={canvasRef} style={{ display: "none" }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream ?
                                <i className="fas fa-camera" onClick={handleCapture}></i>
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream}></i>
                                    <div className="file_upload">
                                        <i className="fas fa-image"></i>
                                        <input type="file"
                                            name="file" id="file" multiple
                                            accept="image/*,video/*"
                                            onChange={handleImages}
                                        />
                                    </div>
                                </>
                        }

                    </div>
                </div>
                <div className="status_footer">
                    <button className="btn btn-primary w-100" type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal