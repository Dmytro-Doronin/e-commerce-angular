import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core'
import { ButtonComponent } from '../ui/button/button.component'
import { InputComponent } from '../ui/input/input.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { avatarValidator } from './registration-form-validator'
import { RegistrationStoreService } from '../../shared/services/auth/registration/registration-store.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnDestroy {
  registrationStoreService = inject(RegistrationStoreService)
  registrationUserSubscription: Subscription | null = null

  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    avatar: new FormControl('', [Validators.required, avatarValidator]),
  })

  get name() {
    return this.registrationForm.get('name')
  }

  isNameInvalid() {
    return this.name?.invalid && (this.name?.dirty || this.name?.touched)
  }

  get email() {
    return this.registrationForm.get('email')
  }

  isEmailInvalid() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched)
  }

  get password() {
    return this.registrationForm.get('password')
  }
  isPasswordInvalid() {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched)
  }
  get avatar() {
    return this.registrationForm.get('avatar')
  }

  isAvatarInvalid() {
    return this.avatar?.invalid && (this.avatar?.dirty || this.avatar?.touched)
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationUserSubscription = this.registrationStoreService
        .registrationUser({
          name: this.registrationForm.value.name!,
          email: this.registrationForm.value.email!,
          password: this.registrationForm.value.password!,
          avatar: this.registrationForm.value.avatar!,
        })
        .subscribe({
          next: () => {
            this.registrationForm.reset()
          },
          error: err => {
            console.error('Registration failed:', err)
          },
        })
    }
  }

  ngOnDestroy() {
    this.registrationUserSubscription?.unsubscribe()
  }
}
