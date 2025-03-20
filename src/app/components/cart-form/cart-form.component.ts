import { ChangeDetectionStrategy, Component, output } from '@angular/core'
import { ButtonComponent } from '../ui/button/button.component'
import { InputComponent } from '../ui/input/input.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CartFormInterface } from '../../pages/cart/cart.interface'

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartFormComponent {
  formSubmitted = output<CartFormInterface>()

  cartForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  get name() {
    return this.cartForm.get('name')
  }

  isNameInvalid() {
    return this.name?.invalid && (this.name?.dirty || this.name?.touched)
  }

  get email() {
    return this.cartForm.get('email')
  }

  isEmailInvalid() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched)
  }

  get address() {
    return this.cartForm.get('address')
  }
  isAddressInvalid() {
    return this.address?.invalid && (this.address?.dirty || this.address?.touched)
  }

  onSubmit() {
    if (this.cartForm.valid) {
      this.formSubmitted.emit({
        name: this.cartForm.value.name!,
        email: this.cartForm.value.email!,
        address: this.cartForm.value.address!,
      })
      this.cartForm.reset()
    }
  }
}
