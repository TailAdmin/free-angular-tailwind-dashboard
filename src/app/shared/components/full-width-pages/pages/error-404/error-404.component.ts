import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridShapeComponent } from '../../../common/grid-shape/grid-shape.component';
import { Error404Props } from './types';

@Component({
  selector: 'app-error-404',
  imports: [CommonModule, RouterModule, GridShapeComponent],
  host: {
    class: 'block w-full',
  },
  template: `
    <div
      class="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 {{ className }}"
    >
      <app-grid-shape />

      <div class="mx-auto w-full max-w-60.5 text-center sm:max-w-118">
        <h1
          class="text-title-md xl:text-title-2xl mb-8 font-bold text-gray-800 dark:text-white/90"
        >
          {{ title }}
        </h1>

        <img
          src="/images/error/404.svg"
          alt="404"
          class="dark:hidden mx-auto"
          width="472"
          height="152"
        />
        <img
          src="/images/error/404-dark.svg"
          alt="404"
          class="hidden dark:block mx-auto"
          width="472"
          height="152"
        />

        <p class="mt-10 mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-400">
          {{ description }}
        </p>

        <a
          [routerLink]="homeHref"
          class="inline-flex h-12.5 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
          {{ homeLinkText }}
        </a>
      </div>

      <p
        class="absolute start-1/2 bottom-6 -translate-x-1/2 text-center text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400"
      >
        &copy; {{ currentYear }} - TailAdmin
      </p>
    </div>
  `,
})
export class Error404Component implements Error404Props {
  @Input() title: string = 'ERROR';
  @Input() description: string = 'We can’t seem to find the page you are looking for!';
  @Input() homeLinkText: string = 'Back to Home Page';
  @Input() homeHref: string = '/';
  @Input() className: string = '';

  currentYear: number = new Date().getFullYear();
}
