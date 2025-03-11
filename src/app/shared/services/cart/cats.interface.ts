import { Product } from '../products/products.interface'

export interface CartItem {
  product: Product
  quantity: number
}
