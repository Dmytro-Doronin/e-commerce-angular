import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ButtonComponent } from '../ui/button/button.component'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {}
