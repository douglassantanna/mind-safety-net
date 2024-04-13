import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
    importProvidersFrom(MatDialogModule),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])),
    provideAnimations(),
    importProvidersFrom(MatDatepickerModule),
    importProvidersFrom(MatNativeDateModule),
  ]
})
  .catch((err) => console.error(err));
