import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filtersForSlider',
  standalone: true,
})
export class FiltersForSliderPipe implements PipeTransform {
  transform<T, P extends keyof T>(
    items: T[] | undefined | null,
    searchingProperty: P,
    searchValue?: T[P]
  ): string[] {
    if (!items?.length) {
      return []
    }

    if (searchValue === undefined || searchValue === null) {
      return items.map(item => String(item[searchingProperty])).filter(value => value.trim() !== '')
    }

    return items
      .filter(item => item[searchingProperty] === searchValue)
      .map(item => String(item[searchingProperty]))
      .filter(value => value.trim() !== '')
  }
}
