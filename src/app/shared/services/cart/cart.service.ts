import { computed, Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<{ id: string; quantity: number }[]>([])
  cartCount = computed(() =>
    this.cartItems().reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
  )

  addToCart = (id: string) => {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === id)
      if (existingItem) {
        return items.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...items, { id, quantity: 1 }]
      }
    })
  }

  removeFromCart(id: string) {
    this.cartItems.update(items => items.filter(item => item.id !== id))
  }

  clearCart() {
    this.cartItems.set([])
  }
}
