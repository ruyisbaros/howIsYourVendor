import React from 'react'
import Status from '../components/status/Status'
import Posts from "../components/profile/ProfilePosts"
import GeneralPosts from '../components/posts/GeneralPosts'

const Home = () => {
    return (
        <div className="home ">
            <div className="">
                <Status />
                <GeneralPosts />
            </div>
        </div>
    )
}

export default Home
