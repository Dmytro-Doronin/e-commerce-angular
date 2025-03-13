import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIconComponent {}
