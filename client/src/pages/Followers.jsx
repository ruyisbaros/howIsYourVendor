import React from 'react'

import UserCard from '../components/user/UserCard'
import FollowBtn from '../components/FollowBtn'
import { useSelector } from 'react-redux'

const Followers = ({ setShowFollowers, followers }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    console.log(followers);
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followers</h5>
                <hr />

                {
                    followers.map(flw => (
                        <UserCard key={flw._id} user={flw} border="border" >
                            {currentUser._id !== flw._id && <FollowBtn user={flw} />}
                        </UserCard>
                    ))
                }
                <div className="close" onClick={() => setShowFollowers(false)}>&times;</div>

            </div>
        </div>
    )
}

export default Followers
