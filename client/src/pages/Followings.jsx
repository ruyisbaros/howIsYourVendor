import React from 'react'

import UserCard from '../components/user/UserCard'
import FollowBtn from '../components/FollowBtn'
import { useSelector } from 'react-redux'

const Followings = ({ setShowFollowings, followings }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    console.log(followings);
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followings</h5>
                <hr />

                {
                    followings.map(flw => (
                        <UserCard key={flw._id} user={flw} border="border" >
                            {currentUser._id !== flw._id && <FollowBtn user={flw} />}
                        </UserCard>
                    ))
                }
                <div className="close" onClick={() => setShowFollowings(false)}>&times;</div>

            </div>
        </div>
    )
}

export default Followings
