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
  placeholder = input<string | null>('')
  @Input() control: FormControl = new FormControl('')
}
