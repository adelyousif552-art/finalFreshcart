import {email, z} from "zod"

export const signupchema=z.object({
    name:z.string().nonempty('name is required').min(3),
    email:z.string().nonempty('email is required').pipe(z.email('invalid email')),
    password:z.string().nonempty('password is required').min(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    rePassword:z.string(),
    phone:z.string().nonempty('phone is required').regex(/^01[0125]\d{8}$/),
    terms:z.boolean().refine((value)=>value,{message:'you must accept conditions'})
}).refine((data)=>data.password===data.rePassword,{
    message:'password do not match repassword',
    path:['rePassword']
})

export type signupschematype=z.infer<typeof signupchema>