import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  form = this.fb.group({
    email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
    password: this.fb.control<string | null>(null, Validators.required)
  });

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      const formValue = this.form.value;
        this.authService.signIn({
          email: formValue.email ?? '',
          password: formValue.password ?? ''
        }).subscribe(() => this.router.navigateByUrl('home'));
      }
  }
}
