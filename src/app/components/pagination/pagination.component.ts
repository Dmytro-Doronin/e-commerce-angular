import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { ButtonComponent } from '../ui/button/button.component'
import { ArrowLeftIconComponent } from '../icons/arrow-left-icon/arrow-left-icon.component'
import { ArrowRightIconComponent } from '../icons/arrow-right-icon/arrow-right-icon.component'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, ArrowLeftIconComponent, ArrowRightIconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  activeIndex = input<number>(1)
  activeIndexChange = output<number>()
  readonly appPaginationChunkSize = input<number>(4)
  readonly countOfProducts = input<number>(0)
  getTotalPages = computed(() => Math.ceil(this.countOfProducts() / this.appPaginationChunkSize()))

  readonly arrayForIndexLength = computed(() =>
    Math.ceil(this.countOfProducts() / this.appPaginationChunkSize())
  )

  // readonly pageIndexes = computed(() =>
  //   [...new Array(this.arrayForIndexLength())].map((_, i) => i + 1)
  // )
  //
  // setIndex(pageIndex: number) {
  //   this.activeIndexChange.emit(pageIndex)
  // }

  readonly pageIndexes = computed(() => {
    const totalPages = this.getTotalPages()
    const current = this.activeIndex()
    const visiblePages = 3

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = [1]

    if (current > visiblePages + 2) {
      pages.push('...')
    }

    const start = Math.max(2, current - visiblePages)
    const end = Math.min(totalPages - 1, current + visiblePages)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < totalPages - visiblePages - 1) {
      pages.push('...')
    }

    pages.push(totalPages)
    return pages
  })

  setIndex(pageIndex: number | string) {
    if (typeof pageIndex === 'number') {
      this.activeIndexChange.emit(pageIndex)
    }
  }

  next() {
    this.activeIndexChange.emit(
      this.activeIndex() + 1 <= this.getTotalPages() ? this.activeIndex() + 1 : this.activeIndex()
    )
  }

  previous() {
    this.activeIndexChange.emit(
      this.activeIndex() - 1 > 0 ? this.activeIndex() - 1 : this.activeIndex()
    )
  }
}
