import PostForm from '@/components/forms/PostForm'


const CreatePost = () => {
  return (
    <div className='flex flex-col flex-1 items-center w-full gap-8 '>
      <div className='w-full text-center'>
        <h2>Create Post</h2>
      </div>

      <PostForm />
    </div>
  )
}

export default CreatePost