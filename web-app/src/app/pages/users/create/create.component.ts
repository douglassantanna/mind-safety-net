import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewUser } from '../../../core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  newUser: NewUser = {} as NewUser;
  title = 'Create New User';
  editMode = false;
  userToEdit?: NewUser;
  userForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    if (this.userToEdit) {
      this.editMode = true;
      this.newUser = Object.assign({}, this.userToEdit); // Avoid modifying original data
    }
  }

  onSubmit() {
    if (this.editMode) {
    } else {
    }

  }

  get fullNameFormControl() {
    return this.userForm.get('fullName') as FormControl;
  }
  get emailFormControl() {
    return this.userForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.userForm.get('password') as FormControl;
  }
}
