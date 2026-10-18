import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LiveDirectionality } from './shared/services/live-directionality.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: Directionality, useClass: LiveDirectionality },
  ],
};
