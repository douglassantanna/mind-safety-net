import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { NotificationsService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SubmitButtonComponent],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loading = false;
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitLogin() {
    this.loading = true;
    this.authService.login(this.emailFormControl?.value, this.passwordFormControl?.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.notificationsService.showSuccess("Your're logged in!");
          this.redirectUser();
        },
        error: (err) => {
          this.loading = false;
          if (err.status == 401)
            this.notificationsService.showError("Unauthorized!");
        }
      });
  }

  private redirectUser() {
    if (this.authService.role == 'patient')
      this.router.navigateByUrl('patients/advices');

    else
      this.router.navigateByUrl('patients/list');
  }

  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }
}
