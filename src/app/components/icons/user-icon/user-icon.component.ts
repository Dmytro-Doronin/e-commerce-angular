import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIconComponent {}
