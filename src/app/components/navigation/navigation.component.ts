import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core'
import { NgClass } from '@angular/common'
import { FilterNamePipe } from '../../shared/pipes/filter-name/filter-name.pipe'
import { Category } from '../../shared/services/categories/categories.interface'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, FilterNamePipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  categories = input<Category[] | null>(null)
  extended = input<boolean>(false)
  variant = input<'a-side' | 'burger'>('a-side')

  activeCategory = signal<Category | null>(null)
  isActiveCategory = computed(
    () => this.categories() && this.extended() && this.activeCategory() === null
  )

  constructor() {
    effect(
      () => {
        if (this.isActiveCategory()) {
          this.activeCategory.set(this.categories()![0])
        }
      },
      { allowSignalWrites: true }
    )
  }

  onMouseOver(category: Category) {
    this.activeCategory.set(category)
  }
}
