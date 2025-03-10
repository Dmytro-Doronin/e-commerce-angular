import { Routes } from '@angular/router'
import { StartPageComponent } from './pages/start-page/start-page.component'

export const routes: Routes = [
  { path: '', component: StartPageComponent },
  {
    path: 'products-list',
    loadComponent: () =>
      import('./pages/products-list/products-list.component').then(m => m.ProductsListComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
  },
]
