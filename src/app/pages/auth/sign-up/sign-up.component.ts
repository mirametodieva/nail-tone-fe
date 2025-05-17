import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form = this.fb.group({
    name: this.fb.control<string | null>(null, Validators.required),
    email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
    password: this.fb.control<string | null>(null, [Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-\+=<>?]).{8,50}$/)]),
    confirmedPassword: this.fb.control<string | null>(null, Validators.required)
  }, { validators: this.passwordsMatchValidator });

  hideConfirmedPassword = false;
  hidePassword = false;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.value;
      if (formValue.password === formValue.confirmedPassword) {
        this.authService.signUp({
          name: formValue.name ?? '',
          email: formValue.email ?? '',
          password: formValue.password ?? ''
        }).subscribe(() => this.router.navigateByUrl('home'));
      }
    }
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmedPassword = control.get('confirmedPassword')?.value;

    if (!password || !confirmedPassword) {
      return null;
    }

    return password === confirmedPassword ? null : { passwordMismatch: true };
  };
}
