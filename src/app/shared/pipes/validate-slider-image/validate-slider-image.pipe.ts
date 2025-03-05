import { inject, Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Pipe({
  name: 'validateSliderImage',
  standalone: true,
})
export class ValidateSliderImagePipe implements PipeTransform {
  sanitizer = inject(DomSanitizer)
  // transform(value: string) {
  //   const urlPattern = /^(https?:\/\/)[^\s]+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i
  //
  //   if (urlPattern.test(value)) {
  //     return value
  //   }
  //
  //   return '../../assets/images/empty.jpg';
  // }
  transform(
    imageUrl: string | null | undefined,
    fallback = '../../assets/images/empty.jpg'
  ): SafeUrl {
    if (!imageUrl || imageUrl.includes('ERR_BLOCKED_BY_RESPONSE')) {
      return this.sanitizer.bypassSecurityTrustUrl(fallback)
    }
    console.log('11')
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl)
  }
}
