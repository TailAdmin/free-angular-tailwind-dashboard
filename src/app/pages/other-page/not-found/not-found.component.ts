import { Component } from '@angular/core';
import { Error404Component } from '../../../shared/components/full-width-pages';

@Component({
  selector: 'app-not-found',
  imports: [Error404Component],
  host: {
    class: 'block w-full',
  },
  template: `<app-error-404 />`,
})
export class NotFoundComponent {}
