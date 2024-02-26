import { Component } from '@angular/core';
import { User } from '../../../core/models/user';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  users: User[] = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  ];
  selectedUserId: number | null = null;

  constructor() { }

  ngOnInit() { }

  selectUser(userId: number) {
    this.selectedUserId = userId;

    console.log(userId)
    // Implement logic to show details for the selected user
  }
}
