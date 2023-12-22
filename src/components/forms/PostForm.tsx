import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";




export type PostFormProps ={
  post?: Models.Document;
  action : 'Create' | 'Update';
}

const PostForm = ({ post,action }: PostFormProps) => {

  const { mutateAsync: createPost, isPending:isLoadingCreate} = useCreatePost();
  const { mutateAsync: updatePost, isPending:isLoadingUpdate} = useUpdatePost();

  const {user} = useUserContext();
  const {toast} = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
 
    //action = update
    if(post && action === "Update") {
      const updatedPost = await  updatePost({
        ...values,
        postId:post.$id,
        imageId:post.imageId ,
        imageUrl: post.imageUrl ,
      })
      console.log(values),"valuesData";
      console.log("updatedPostData",updatedPost)
      if(!updatedPost) {
        toast({ title: `${action} post failed`})
      }
      return navigate('/')
    }


    //action = create
    
    const newPost = await createPost({
      ...values,
      userId:user.id,
    })
    if(!newPost){
      toast({
        title:`${action} post failed. Try again`
      })
     
    }
    toast({
      title: `${action} post successfull`
    })
    navigate('/');
    console.log(values);
  
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-5xl px-4 gap-2 text-black bg-gray-800 rounded-lg"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Upload Image</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tags</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="cats,dogs,anime..."
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex gap-4 mt-8 mb-16">
          <Button
            type="button"
            className="w-full hover:bg-gray-500 hover:font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full bg-violet-400 text-black hover:text-white hover:bg-red-700 hover:font-bold"
          >{(isLoadingCreate || isLoadingUpdate) && "Loading..."}
            {action} Post
          </Button>
          {/* <TailwindButton /> */}
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
