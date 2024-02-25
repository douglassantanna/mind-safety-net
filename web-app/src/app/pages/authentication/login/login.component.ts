import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading = false;
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {

    this.loading = true;
    this.authService.login(this.emailFormControl?.value, this.passwordFormControl?.value).subscribe({
      next: () => {
        this.loading = false;
        // this.router.navigate(['/cryptos']);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.errorMessage = "Credentials don't match";
      }
    });
  }

  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }
}
