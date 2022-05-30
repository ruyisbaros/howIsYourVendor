import { useSelector } from 'react-redux';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';


const GeneralPosts = () => {
    const { posts } = useSelector(store => store.posts)
    return (
        <div className="posts">
            {
                posts.map(post => (
                    <div className="card my-3" key={post._id}>
                        <CardHeader post={post} />
                        <CardBody post={post} />
                        <CardFooter post={post} />
                    </div>
                ))
            }
        </div>
    )
}

export default GeneralPosts