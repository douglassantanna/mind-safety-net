import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
    importProvidersFrom(MatDialogModule),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),

  ]
})
  .catch((err) => console.error(err));
