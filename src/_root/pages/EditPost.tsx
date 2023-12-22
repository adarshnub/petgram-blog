import PostForm from '@/components/forms/PostForm'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import { useParams } from 'react-router-dom';


const EditPost = () => {

    const {id} = useParams();
    const {data:post, isPending} = useGetPostById(id);

    // console.log(post,"postData")

    if(isPending)
    return (
        <div className='flex text-center justify-center'>
            Loading....
        </div>
        )
  return (
    <div className='flex flex-col flex-1 items-center w-full gap-8 '>
    <div className='w-full text-center'>
      <h2>Edit Post</h2>
    </div>

    {isPending ? "Loading..."
    : <PostForm action='Update' post={post}   />
    }
  </div>
  )
}

export default EditPost