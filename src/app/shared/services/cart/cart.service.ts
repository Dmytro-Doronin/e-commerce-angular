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

  constructor() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart))
    }
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()))
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
