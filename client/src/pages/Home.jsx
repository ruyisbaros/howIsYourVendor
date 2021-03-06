import Status from '../components/status/Status'
import GeneralPosts from '../components/posts/GeneralPosts'
import RightSideBar from '../components/home/RightSideBar';
import { useSelector } from 'react-redux';
import LoadImg from "../images/loading-2.gif"

const Home = () => {
    const { result, profilePostFetching, posts } = useSelector(store => store.posts)
    return (
        <div className="home ">
            <div className="">
                <Status />
                {
                    profilePostFetching ? <img src={LoadImg} alt="Loading" className="d-block mx-auto" /> :
                        result === 0 || posts.length === 0 ? <h2 className="text-center">No posts found</h2> : <GeneralPosts />
                }
            </div>
            <div className="col-md-4">
                <RightSideBar />
            </div>
        </div>
    )
}

export default Home
