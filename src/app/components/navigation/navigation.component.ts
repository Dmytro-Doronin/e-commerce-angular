import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  categories = input<string[]>()
  variant = input<'a-side' | 'burger'>('a-side')
}
