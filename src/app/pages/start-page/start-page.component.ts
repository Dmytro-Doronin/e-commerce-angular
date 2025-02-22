import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CarouselComponent } from '../../components/carousel/carousel.component'
import { CardComponent } from '../../components/card/card.component'
import { productsMock } from '../../shared/products.mock'

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CarouselComponent, CardComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {
  slides = [
    { img: 'https://lemon.school/storage/2023/07/img_7017-780x258.png' },
    { img: 'https://lemon.school/storage/2023/07/img_7017-780x258.png' },
    { img: 'https://lemon.school/storage/2023/07/img_7017-780x258.png' },
  ]

  products = productsMock
}
