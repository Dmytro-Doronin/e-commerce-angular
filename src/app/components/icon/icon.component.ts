import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name = input('name')
  size = input(24)
  fill = input('currentColor')
}
