import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewUser, User } from '../../../core/models/user';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    SubmitButtonComponent,
    MatSlideToggleModule
  ],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  newUser: NewUser = {} as NewUser;
  title = 'Create New User';
  userForm: FormGroup;
  loading = false;
  errorMessage = '';
  editMode = false;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userToEdit: User
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      active: true
    });
  }

  ngOnInit() {
    if (this.userToEdit) {
      this.userForm.patchValue({
        fullName: this.userToEdit.name,
        email: this.userToEdit.email,
        active: this.userToEdit.active,
      });
    }
  }

  onSubmit() {
  }

  get fullNameFormControl() {
    return this.userForm.get('fullName') as FormControl;
  }
  get emailFormControl() {
    return this.userForm.get('email') as FormControl;
  }
  get activeFormControl() {
    return this.userForm.get('active') as FormControl;
  }
}
