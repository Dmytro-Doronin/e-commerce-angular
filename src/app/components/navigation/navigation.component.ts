import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core'
import { NgClass } from '@angular/common'
import { Category } from '../../shared/services/categories/categories.interface'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  categories = input<Category[] | null>(null)
  extended = input<boolean>(false)
  variant = input<'a-side' | 'burger' | 'modal'>('a-side')

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
    if (this.variant() !== 'a-side') {
      this.activeCategory.set(category)
    }
  }
}
