import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blank-card',
  imports: [CommonModule],
  host: {
    class: 'block w-full',
  },
  template: `
    <div
      class="flex min-h-screen items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-7 shadow-none xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/3 {{ className }}"
    >
      <div class="mx-auto w-full max-w-157.5 text-center">
        <h3
          class="text-theme-xl mb-4 font-semibold text-gray-800 sm:text-2xl dark:text-white/90"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-gray-500 sm:text-base dark:text-gray-400">
          {{ description }}
        </p>
      </div>
    </div>
  `,
})
export class BlankCardComponent {
  @Input() title: string = 'Card Title Here';
  @Input() description: string =
    'Start putting content on grids or panels, you can also use different combinations of grids. Please check out the dashboard and other pages';
  @Input() className: string = '';
}
