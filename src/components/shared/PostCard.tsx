import { Models } from 'appwrite'
import { Link } from 'react-router-dom';


type PostCardProps = {
    post : Models.Document;
}

const PostCard = ({post}: PostCardProps) => {
  return (
    <div className='' >
        <div className='flex flex-col gap-8'>
            <div>
                <h2>{post?.caption}</h2>
                <div>
                <img 
                src={post.imageUrl} />
            </div>
                <Link to={`/profile/${post.creator.$id}`}
                className='flex gap-4'>
                    <img 
                    className='rounded-full w-10'
                    src={post?.creator?.imageUrl} />
                    <h3 className='text-white'>{post?.creator?.name}</h3>
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default PostCard