import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputComponent } from '../ui/input/input.component'
import { ButtonComponent } from '../ui/button/button.component'
import { LoginStoreService } from '../../shared/services/auth/login/login-store.service'

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  loginStoreService = inject(LoginStoreService)

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  get email() {
    return this.loginForm.get('email')
  }

  isEmailInvalid() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched)
  }

  get password() {
    return this.loginForm.get('password')
  }
  isPasswordInvalid() {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched)
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginStoreService
        .login({
          email: this.loginForm.value.email!,
          password: this.loginForm.value.password!,
        })
        .subscribe({
          next: () => {
            this.loginForm.reset()
          },
        })
    }
  }
}
