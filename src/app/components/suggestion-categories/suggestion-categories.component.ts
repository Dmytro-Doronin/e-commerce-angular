import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Category } from '../../shared/services/categories/categories.interface'
import { LoaderComponent } from '../loader/loader.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-suggestion-categories',
  standalone: true,
  imports: [NgClass, NgStyle, LoaderComponent, RouterLink],
  templateUrl: './suggestion-categories.component.html',
  styleUrl: './suggestion-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionCategoriesComponent {
  popularCategories = input<Category[] | null>()
  isLoading = input<boolean>(false)
  readonly categoryGridAreas = ['area-a', 'area-b', 'area-c', 'area-d', 'area-e', 'area-f']
}
