import { useSelector } from 'react-redux';
import PostCard from '../profile/profilePosts/PostCard'


const GeneralPosts = () => {
    const { posts } = useSelector(store => store.posts)
    return (
        <div className="posts">
            {
                posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            }
        </div>
    )
}

export default GeneralPosts

