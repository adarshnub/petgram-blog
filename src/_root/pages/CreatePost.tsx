import PostForm from '@/components/forms/PostForm'


const CreatePost = () => {
  return (
    <div className='flex flex-col flex-1 items-center w-full gap-8 max-w-3xl justify-center mx-auto'>
      <div className='w-full text-center'>
        <h2>Create Post</h2>
      </div>

      <PostForm action='Create'/>
    </div>
  )
}

export default CreatePost