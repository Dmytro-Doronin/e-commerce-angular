import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-success-icon',
  standalone: true,
  imports: [],
  templateUrl: './success-icon.component.html',
  styleUrl: './success-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessIconComponent {}
