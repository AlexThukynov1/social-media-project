import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../common/FileUploader"
import { PostValidation } from "@/lib/validation"
import type { Models } from "appwrite"
import {useCreatePostAccountMutation} from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import {useToast} from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom"

type PostFormProps = {
  post?: Models.Document
}

const PostForm = ({post}: PostFormProps) => {
const {user} = useUserContext();
const {toast} = useToast();
const navigate = useNavigate();

const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  })

  const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePostAccountMutation();


async function onSubmit(values: z.infer<typeof PostValidation>) {
    try{
          const newPost = await createPost({
      ...values,
      userId:user.id,
    })

    if(!newPost) {
      toast({
        title: 'Please try again',
      })
    }

    navigate('/');
    } catch (error) {
      toast({
        title: `Error: ${error}`,
      })
    }

  }
   const submitTest = ()=> {
    console.log('test');
   };

  return (
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add tags (separated by coma)</FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  className="shad-input" 
                  placeholder="Learn, Design, Study"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        
        <div className="flex gap-4 items-center justify-end">
          <Button 
          type="button"
          className="shad-button_dark_4"
        >
            Cancel
          </Button>
          <Button 
          type="submit"
          disabled={isLoadingCreate}
            className="shad-button_primary whitespace-nowrap px-5 py-6"
          >
            {isLoadingCreate ? 'Posting...' : 'Submit'}
          </Button>

          {/* <button
            onClick={onSubmit}
          > test</button> */}
        </div>

      </form>
    </Form>
  )
}

export default PostForm
