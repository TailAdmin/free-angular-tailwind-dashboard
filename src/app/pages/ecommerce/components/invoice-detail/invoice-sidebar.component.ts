import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { InputDirective } from '../ui/input/input.directive';

@Component({
  selector: 'app-invoice-sidebar',
  imports: [InputDirective, ButtonComponent, CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="relative mb-5 w-full">
      <form>
        <button app-button variant="unstyled" type="button" class="absolute start-4 top-1/2 -translate-y-1/2">
          <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z" />
          </svg>
        </button>
        <input app-input unstyled type="text" placeholder="Search Invoice..."
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pe-3.5 ps-[42px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
      </form>
    </div>

    <div class="space-y-1">
      @for (user of users; track user.id) {
        <div
          class="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/3"
          [ngClass]="{ 'bg-gray-100 dark:bg-white/3': user.active }">
          <div class="h-12 w-12 overflow-hidden rounded-full">
            <img [src]="user.image" [alt]="user.name" />
          </div>
          <div>
            <span class="mb-0.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              {{ user.name }}
            </span>
            <span class="block text-theme-xs text-gray-500 dark:text-gray-400">
              ID: {{ user.id }}
            </span>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class InvoiceSidebarComponent {
  users = [
    {
      name: 'Zain Geidt',
      id: '#348',
      image: './images/user/user-19.jpg',
      active: true,
    },
    {
      name: 'Carla George',
      id: '#982',
      image: './images/user/user-17.jpg',
    },
    {
      name: 'Abram Schleifer',
      id: '#289',
      image: './images/user/user-20.jpg',
    },
    {
      name: 'Lincoln Donin',
      id: '#522',
      image: './images/user/user-34.jpg',
    },
  ];
}
