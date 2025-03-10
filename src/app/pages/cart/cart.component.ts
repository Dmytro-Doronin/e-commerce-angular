import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SectionComponent } from '../../components/section/section.component'
import { CardComponent } from '../../components/card/card.component'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SectionComponent, CardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
