import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-plus-icon',
  standalone: true,
  imports: [],
  templateUrl: './plus-icon.component.html',
  styleUrl: './plus-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusIconComponent {}
