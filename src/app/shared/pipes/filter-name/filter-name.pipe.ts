import { Pipe, PipeTransform } from '@angular/core'
import { Category } from '../../services/categories/categories.interface'

@Pipe({
  name: 'filterNamePipe',
  standalone: true,
})
export class FilterNamePipe implements PipeTransform {
  transform(categories: Category[] | undefined | null): string[] {
    if (!categories?.length) {
      return []
    }

    return categories.map(category => category.name)
  }
}
