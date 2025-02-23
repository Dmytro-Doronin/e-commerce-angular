import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CarouselComponent } from '../../components/carousel/carousel.component'
import { ProductsStoreService } from '../../shared/services/products/products-store.service.ts.service'
import { CardListComponent } from '../../components/card-list/card-list.component'
import { SectionComponent } from '../../components/section/section.component'
import { ButtonComponent } from '../../components/ui/button/button.component'

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CarouselComponent, CardListComponent, SectionComponent, ButtonComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {
  productsStoreService = inject(ProductsStoreService)

  readonly products = this.productsStoreService.suggestionProducts$

  slides = [
    'https://lemon.school/storage/2023/07/img_7017-780x258.png',
    'https://lemon.school/storage/2023/07/img_7017-780x258.png',
    'https://lemon.school/storage/2023/07/img_7017-780x258.png',
  ]
  ngOnInit() {
    this.productsStoreService.loadProducts()
  }
}
