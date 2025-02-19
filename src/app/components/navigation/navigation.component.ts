import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { NgClass } from '@angular/common'
import { Category } from '../../shared/categories.interface'
import { FilterNamePipe } from '../../shared/pipes/filter-name/filter-name.pipe'
import { FilterSubCategoriesPipe } from '../../shared/pipes/filter-sub-categories/filter-sub-categories.pipe'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, FilterNamePipe, FilterSubCategoriesPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  categories = input<Category[]>()
  extended = input<boolean>(false)
  variant = input<'a-side' | 'burger'>('a-side')

  activeCategory = signal<string | null>(null)

  onMouseOver(category: string) {
    this.activeCategory.set(category)
  }
}
