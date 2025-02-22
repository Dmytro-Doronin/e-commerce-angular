import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
export class CarouselComponent implements AfterViewInit {
  slides = input<{ img: string }[]>()
  readonly swiperRef = viewChild.required('swiperContainer', {
    read: ViewContainerRef,
  })

  ngAfterViewInit() {
    const container = this.swiperRef().element.nativeElement
    if (container) {
      new Swiper(container, {
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
        // autoplay: { delay: 6000 },
        loop: false,
      })
    }
  }
}
