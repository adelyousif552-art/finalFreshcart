
export interface OrderProductSubcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface OrderCategory {
  _id: string
  name: string
  slug: string
  image: string
}

export interface OrderBrand {
  _id: string
  name: string
  slug: string
  image: string
}

export interface OrderProduct {
  subcategory: OrderProductSubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: OrderCategory
  brand: OrderBrand
  ratingsAverage: number
  id: string
}

export interface OrderCartItem {
  count: number
  _id: string
  product: OrderProduct
  price: number
  priceAfterDiscount?:number
}

export interface OrderShippingAddress {
  details: string
  phone: string
  city: string
  postalCode: string
}

export interface OrderUser {
  _id: string
  name: string
  email: string
  phone: string
}

export interface Order {
  shippingAddress?: OrderShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: "cash" | "card"
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: OrderUser
  cartItems: OrderCartItem[]
  paidAt?: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export type OrdersResponse = Order[]

