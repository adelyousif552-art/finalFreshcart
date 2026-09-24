import {email, z} from "zod"

export const Loginschema=z.object({
   
    email:z.string().nonempty('email is required').pipe(z.email('invalid email')),
    password:z.string().nonempty('password is required'),
    terms:z.boolean()
    
})

export type Loginschematype=z.infer<typeof Loginschema>