import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';
import { NavComponent } from './layout/nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public authService: AuthenticationService) {
  }

}
