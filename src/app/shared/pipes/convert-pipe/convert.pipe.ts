import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'convertPipeTs',
  standalone: true,
})
export class ConvertPipe implements PipeTransform {
  transform(value: number): unknown {
    return `€${value}`
  }
}
