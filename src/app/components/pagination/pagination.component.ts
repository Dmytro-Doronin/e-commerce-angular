import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { ButtonComponent } from '../ui/button/button.component'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
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

  readonly pageIndexes = computed(() =>
    [...new Array(this.arrayForIndexLength())].map((_, i) => i + 1)
  )

  setIndex(pageIndex: number) {
    this.activeIndexChange.emit(pageIndex)
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
