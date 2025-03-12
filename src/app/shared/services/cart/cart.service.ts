import { computed, Injectable, signal } from '@angular/core'
import { Product } from '../products/products.interface'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<{ product: Product; quantity: number }[]>([])

  cartCount = computed(() =>
    this.cartItems().reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
  )
  totalPrice = computed(() =>
    this.cartItems().reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.product.price * currentValue.quantity,
      0
    )
  )

  constructor() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart))
    }
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()))
  }

  isInCart(product: Product): boolean {
    return this.cartItems().some(item => item.product.id === product.id)
  }

  addOneMore(id: string) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === id)
      if (existingItem && existingItem.quantity >= 0) {
        return items.map(item =>
          item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return items
    })
    this.updateCart()
  }

  removeOne(id: string) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return items.map(item =>
          item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return items
    })
    this.updateCart()
  }

  addToCart = (product: Product) => {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id)
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...items, { product, quantity: 1 }]
      }
    })
    this.updateCart()
  }

  removeFromCart(id: string) {
    this.cartItems.update(items => items.filter(item => item.product.id !== id))
    this.updateCart()
  }

  clearCart() {
    this.cartItems.set([])
  }
}
