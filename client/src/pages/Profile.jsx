import React, { useState, useEffect } from 'react'
import Info from '../components/profile/Info'
import Posts from '../components/profile/Posts'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {

    const { profile } = useSelector(store => store.profile)
    const { id } = useParams()
    //console.log(id);

    return (
        <div className="profile">
            <Info />
            <Posts />
        </div>
    )
}

export default Profile