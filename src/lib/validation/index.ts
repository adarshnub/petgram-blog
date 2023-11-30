import * as z from "zod";


export const SignupValidation = z.object({
  name: z.string().min(2, { message: "name cannot be empty or too short" }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must contain atleast 8 charactors" }),
});


export const SignInValidation = z.object({
  
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must contain atleast 8 charactors" }),
});