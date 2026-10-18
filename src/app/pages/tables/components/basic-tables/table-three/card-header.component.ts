import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-table-three-card-header',
  imports: [InputDirective, ButtonComponent, CommonModule, FormsModule],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 {{ className }}"
    >
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Latest Transactions
        </h3>
      </div>

      <div class="flex w-full items-center gap-3 sm:w-auto">
        <div
          class="group/input-group relative flex h-10 w-full min-w-0 flex-1 items-center rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 sm:w-75 sm:flex-initial dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
        >
          <div
            class="flex h-auto items-center justify-center ps-3.5 pe-0 text-gray-400 select-none"
          >
            <svg
              class="size-5"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.382 14.383l3.325 3.326m-1.249-8.334a7.082 7.082 0 01-7.083 7.081 7.082 7.082 0 110-14.163 7.082 7.082 0 017.083 7.082z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <input app-input unstyled
            type="text"
            placeholder="Search..."
            [ngModel]="searchQuery"
            (ngModelChange)="searchChange.emit($event)"
            class="h-full flex-1 rounded-none border-0 bg-transparent ps-2 pe-4 text-sm font-normal text-gray-800 shadow-none ring-0 outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
          />
        </div>

        <button app-button variant="unstyled"
          type="button"
          class="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-transparent px-3.5 text-sm font-medium whitespace-nowrap text-gray-700 shadow-theme-xs transition hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-3 focus-visible:ring-gray-300/50 sm:px-4 sm:py-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <svg
            class="size-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 2a.75.75 0 01.75.75v1h6.5v-1a.75.75 0 011.5 0v1h1.75A2.25 2.25 0 0120.75 6v13a2.25 2.25 0 01-2.25 2.25h-13A2.25 2.25 0 013.25 19V6A2.25 2.25 0 015.5 3.75h1.75v-1A.75.75 0 018 2zm0 3.25H5.5a.75.75 0 00-.75.75v2.25h14.5V6a.75.75 0 00-.75-.75H8zm11.25 4.5H4.75V19c0 .414.336.75.75.75h13a.75.75 0 00.75-.75V9.75z"
              fill="currentColor"
            />
          </svg>
          <span class="hidden sm:inline">05 Feb - 06 March</span>
        </button>
      </div>
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() searchQuery = '';
  @Output() searchChange = new EventEmitter<string>();
  @Input() className = '';
}
