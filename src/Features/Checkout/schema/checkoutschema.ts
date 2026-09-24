import {z}from 'zod'
export const Addressschema=z.object({
    details:z.string().nonempty('Address details Required'),
    phone:z.string().nonempty('phone is required').regex(/^01[0-25]\d{8}$/),
    city:z.string().nonempty('city is required'),
    postalCode:z.string().nonempty('postal code is required')
})
export type addressformtype=z.infer<typeof Addressschema>