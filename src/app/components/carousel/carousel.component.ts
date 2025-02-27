import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  slides = input.required<string[]>()
  delay = input<number>()
  private swiperInstance: Swiper | null = null

  readonly swiperRef = viewChild.required('swiperContainer', {
    read: ViewContainerRef,
  })
  constructor() {
    effect(() => {
      this.initSwiper()
    })
  }

  private initSwiper() {
    const container = this.swiperRef().element.nativeElement
    if (!container) return

    const hasSlides = this.slides()?.length > 1

    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true)
      this.swiperInstance = null
    }

    if (!hasSlides) return

    this.swiperInstance = new Swiper(container, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        bulletClass: 'swiper-bullet',
        bulletActiveClass: 'is-active',
      },
      autoplay: this.delay() ? { delay: this.delay() } : undefined,
      loop: true,
    })
  }
}
