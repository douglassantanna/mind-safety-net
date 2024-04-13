import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewUser, Role, User } from '../../../core/models/user';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SubmitButtonComponent } from '../../../layout/submit-button/submit-button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserService } from '../../../core/services/user.service';
import { MatSelectModule } from '@angular/material/select';

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
    MatSlideToggleModule,
    MatSelectModule
  ],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  roles: any[] = [
    { id: Role.Admin, description: 'Admin' },
    { id: Role.Manager, description: 'Manager' },
    { id: Role.Patient, description: 'Patient' }
  ];
  newUser: NewUser = {} as NewUser;
  title = 'Create New User';
  userForm: FormGroup;
  loading = false;
  errorMessage = '';
  editMode = false;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userToEdit: User,
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      active: true,
      id: null,
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.userToEdit) {
      this.title = 'Edit user';
      this.userForm.patchValue({
        fullName: this.userToEdit.fullName,
        email: this.userToEdit.email,
        active: this.userToEdit.active,
        id: this.userToEdit.id,
        role: this.userToEdit.role
      });
    }
  }

  onSubmit() {
    if (this.userToEdit) {
      this.userService.edit(this.userForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close({ userId: response });
        },
        error: (err) => {
        }
      });
    }
    else {
      this.userService.create(this.userForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close({ userId: response });
        },
        error: (err) => {
        }
      });
    }
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
  get roleFormControl() {
    return this.userForm.get('role') as FormControl;
  }
}
