import { Component, inject } from '@angular/core';
import { User } from '../../../core/models/user';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent {
  private dialog = inject(MatDialog);

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 1, active: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 2, active: false },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 1, active: true },
  ];
  displayedColumns: string[] = ['name', 'email', 'role', 'active', 'actions'];
  selectedUserId: number | null = null;

  constructor() { }

  newUser() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '350px',
      height: '320px'
    })
  }

  ngOnInit() { }

  selectUser(userId: number) {
    this.selectedUserId = userId;

    console.log(userId)
    // Implement logic to show details for the selected user
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: user,
      width: '350px',
      height: '350px'
    })

  }
}
