import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule
  ]
})
export class NavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthenticationService);
  private route = inject(ActivatedRoute);
  private authservice = inject(AuthenticationService);
  isPatient = false;
  patientId = 0;
  ngOnInit(): void {
    if (this.authService.role === 'admin') {
      this.isPatient = true;

    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
  }
}
