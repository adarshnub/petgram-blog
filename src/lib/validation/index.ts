import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "name cannot be empty or too short" }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 charactors" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 charactors" }),
});

export const PostValidation = z.object({
  caption: z.string().min(1,{message:"Give a caption to your post"}).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string().min(1, {message: "At atleast one tag"})
});
