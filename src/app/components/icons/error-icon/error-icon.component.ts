import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-error-icon',
  standalone: true,
  imports: [],
  templateUrl: './error-icon.component.html',
  styleUrl: './error-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorIconComponent {}
