import z from 'zod'
export const updateschema=z.object({
    name:z.string().nonempty('name is required'),
    email:z.email().nonempty('email is required'),
    phone:z.string().nonempty('phone is required').regex(/^01[0125]\d{8}$/)
})

export type updateschematype=z.infer<typeof updateschema>