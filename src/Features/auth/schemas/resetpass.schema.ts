import { object } from 'zod';
import z from 'zod'

export const Resetpassvalidation=z.object({
    email:z.email().nonempty("Email is required"),
    newPassword:z.string().min(8,'password must be at least 8 characters').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,`-At least one upper case English letter , -At least one lower case English letter , -At least one digit , -At least one special character or space Minimum eight in length`)
})
export type Resetpasstype=z.infer<typeof Resetpassvalidation>