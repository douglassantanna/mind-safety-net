import { Component } from '@angular/core';
import { User, ViewUser } from '../../../core/models/user';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { UserService } from '../../../core/services/user.service';

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
  users: ViewUser[] = [];
  displayedColumns: string[] = ['fullName', 'email', 'role', 'active', 'actions'];
  selectedUserId: number | null = null;

  constructor(
    private dialog: MatDialog,
    private userService: UserService) { }

  newUser() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '350px',
      height: '400px'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadUsers();
    })
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.list().subscribe(({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
      }
    }))
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: user,
      width: '350px',
      height: '410px'
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadUsers();
    })
  }
}
