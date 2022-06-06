import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../user/UserCard'
import FollowBtn from '../FollowBtn'
import axios from 'axios';
import { fetchSuggestions } from '../../redux/usersSlicer';
import Loading from '../../images/loading-2.gif'

const RightSideBar = () => {

    const { token, currentUser } = useSelector(store => store.currentUser)
    const { suggestions } = useSelector(store => store.users)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        const getSuggestions = async () => {
            setLoading(true)
            const { data } = await axios.get("/api/v1/users/suggestions", {
                headers: { authorization: token }
            })
            dispatch(fetchSuggestions({ users: data.users, result: data.result }))
            setLoading(false)
        }
        getSuggestions()
    }, [token, dispatch, currentUser.followings])


    return (
        <div className="sidebar_container mt-2">
            <UserCard user={currentUser} />
            <div className="d-flex align-items-center justify-content-between my-2">
                <h5>Add to your feed</h5>
                <i onClick={() => setShowInfo(true)} style={{ cursor: "pointer" }} className="fa-solid fa-circle-info"></i>
            </div>
            {
                showInfo &&
                <div className="info_box">
                    <div>
                        <p>Follow things that interest you to personalize your feed.</p>
                        <span onClick={() => setShowInfo(false)}>&times;</span>
                    </div>
                </div>
            }
            <div className="suggestions">
                {loading && <img className="d-block mx-auto my-4" src={Loading} alt="Loading" />}
                {
                    suggestions?.map(suggestion => (
                        <UserCard key={suggestion._id} user={suggestion} border="border">
                            <FollowBtn user={suggestion} />
                        </UserCard>
                    ))
                }
            </div>
        </div>
    )
}

export default RightSideBar
