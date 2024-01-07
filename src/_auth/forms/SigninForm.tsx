import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";

import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";

import sucessloading from '../../animations/loginload.json'
import Lottie from "lottie-react";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
      try {
        setIsLoading(true)
        const session = await signInAccount({
          email: values.email,
          password: values.password,
        });
    
        if (!session) {
          setIsLoading(false)
          return toast({ title: "Sign in failed . Please try again" });
        }
        const isLoggedIn = await checkAuthUser();
    
        if (isLoggedIn) {
          form.reset();
          navigate("/");
        } else {
          toast({ title: "Sign up failed. Please try again" });
        }
      } catch (error) {
        console.log(error,'login error')
      }finally {
        setIsLoading(false)
      }
  }

  return (
    <>
    {isLoading ? (
        <div className=" relative fullscreen-loading w-screen h-screen bg-white">
         
          <Lottie animationData={sucessloading} 
          className="h-screen"
          />
          
        </div> 
         )
        :  
        <Form {...form}>
      <div>
        <h1 className="font-bold text-center text-xl p-2">Petgram</h1>
        <h2 className="font-bold">Login to your account</h2>
        <p className="text-xs text-right">Welcome back to petverse</p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mt-2 w-full gap-4 max-w-5xl "
      >
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="font-bold">
          {isUserLoading ? (
            <div className="text-white">Loading...</div>
          ) : (
            "Login"
          )}
        </Button>

        <p className="text-sm text-gray-700 text-center mt-2">
          New to Petgram ?
          <Link
            to="/sign-up"
            className="text-blue-400 font-bold hover:underline underline-offset-4 px-1"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
        }
    
    </>
  );
};

export default SigninForm;
