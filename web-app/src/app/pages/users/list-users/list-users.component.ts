import { Component } from '@angular/core';
import { User } from '../../../core/models/user';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 2 },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 1 },
  ];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  selectedUserId: number | null = null;

  constructor() { }

  ngOnInit() { }

  selectUser(userId: number) {
    this.selectedUserId = userId;

    console.log(userId)
    // Implement logic to show details for the selected user
  }
}
