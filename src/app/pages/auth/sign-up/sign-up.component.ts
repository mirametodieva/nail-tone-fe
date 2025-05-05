import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
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
    password: this.fb.control<string | null>(null, Validators.required),
    confirmedPassword: this.fb.control<string | null>(null, Validators.required)
  });

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if(this.form.valid) {
      const formValue = this.form.value;
      if(formValue.password === formValue.confirmedPassword) {
        this.authService.signUp({
          name: formValue.name ?? '',
          email: formValue.email ?? '',
          password: formValue.password ?? ''
        }).subscribe(() => this.router.navigateByUrl('home'));
      }
    }
  }
}
