import { Pipe, PipeTransform } from '@angular/core'
import { Category, SubCategory } from '../../categories.interface'

@Pipe({
  name: 'filterSubCategories',
  standalone: true,
})
export class FilterSubCategoriesPipe implements PipeTransform {
  transform(categories: Category[] | undefined, term: string | null): SubCategory[] {
    if (!categories?.length) {
      return []
    }

    const category = categories.find(item => item.name === term)

    return category ? category.subCategories : []
  }
}
