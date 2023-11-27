import * as z from "zod";


export const SignupValidation = z.object({
    username: z.string().min(2).max(50),
    name: z.string().min(2, {message: 'name cannot be empty or too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must contain atleast 8 charactors'}),
  });