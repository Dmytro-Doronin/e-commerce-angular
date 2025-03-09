import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'navigation'>('primary')
  active = input<boolean>(false)
}
