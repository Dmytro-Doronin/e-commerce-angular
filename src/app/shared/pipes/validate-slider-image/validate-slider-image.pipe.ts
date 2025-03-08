import { Pipe, PipeTransform } from '@angular/core'
import { emptyImage } from '../../products.mock'

@Pipe({
  name: 'validateSliderImage',
  standalone: true,
})
export class ValidateSliderImagePipe implements PipeTransform {
  transform(value: string) {
    const urlPattern = /^(https?:\/\/)[^\s]+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i

    if (urlPattern.test(value)) {
      return value
    }

    return emptyImage
  }
}
