import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ButtonComponent } from '../ui/button/button.component'
import { InputComponent } from '../ui/input/input.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value.email!, this.registrationForm.value.password!)
    }
  }
}
