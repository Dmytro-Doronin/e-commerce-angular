import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  type = input<string>('text')
  id = input<string>('text')
  placeholder = input<string | null>('')
  isError = input<false | undefined | boolean>(false)
  @Input() control: FormControl = new FormControl('')
}
