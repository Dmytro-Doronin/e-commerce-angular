import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { NgStyle } from '@angular/common'
import { ButtonComponent } from '../ui/button/button.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgStyle, ButtonComponent, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  mainVariant = input<boolean>(false)
  slides = input<string[]>([])
  links = input<string[]>([])
  delay = input<number>()
  private swiperInstance: Swiper | null = null

  slidesLength = computed(() => this.slides().length > 1)

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
      navigation: this.slidesLength()
        ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        : undefined,
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
