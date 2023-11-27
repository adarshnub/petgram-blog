import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Link } from "react-router-dom";
import { creeateUserAccount } from "@/lib/appwrite/api";

const SignupForm = () => {
  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });
  

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
   const newUser = await creeateUserAccount(values);
    console.log(newUser);
  }

  return (
    
      <Form {...form}>
        <div>
          <h1 className="font-bold text-center text-xl p-2">Petgram</h1>
          <h2 className="font-bold">Create a new account</h2>
          <p className="text-xs text-right">To start exploring the petverse</p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col mt-2 w-full gap-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    type="email"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="">
            {isLoading ? <div>Loading...</div> : "Sign up"}
          </Button>
          
          <p className="text-sm text-gray-700 text-center mt-2">
            Already have an account ?
            <Link
              to="/sign-in"
              className="text-blue-400 font-semibold hover:underline underline-offset-4 px-1"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    
  );
};

export default SignupForm;
