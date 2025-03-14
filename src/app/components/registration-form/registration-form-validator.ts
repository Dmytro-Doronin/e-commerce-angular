import { AbstractControl, ValidationErrors } from '@angular/forms'

export function avatarValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value
  const urlPattern = /^(https?:\/\/)[^\s]+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i

  if (!value || !urlPattern.test(value)) {
    return { invalidAvatar: true }
  }
  return null
}
