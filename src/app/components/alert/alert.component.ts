import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AlertService } from '../../shared/services/alert/alert.service'
import { NgClass, NgTemplateOutlet } from '@angular/common'
import { ErrorIconComponent } from '../icons/error-icon/error-icon.component'
import { SuccessIconComponent } from '../icons/success-icon/success-icon.component'

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass, ErrorIconComponent, SuccessIconComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  alertService = inject(AlertService)

  alertContent = this.alertService.alert
}
