import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-table-three-card-footer',
  imports: [ButtonComponent, CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="border-t-0 px-5 py-4 sm:px-6 {{ className }}">
      <!-- Mobile Pagination (< sm) -->
      <div class="flex w-full items-center justify-between sm:hidden">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ currentPage }}/{{ totalPages }}
        </span>

        <div class="flex items-center gap-2">
          <button app-button variant="unstyled"
            type="button"
            [disabled]="currentPage <= 1"
            (click)="onPageChange(currentPage - 1)"
            aria-label="Previous page"
            class="flex size-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <svg
              class="size-4 rtl:rotate-180"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button app-button variant="unstyled"
            type="button"
            [disabled]="currentPage >= totalPages"
            (click)="onPageChange(currentPage + 1)"
            aria-label="Next page"
            class="flex size-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <svg
              class="size-4 rtl:rotate-180"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Desktop Pagination (>= sm) -->
      <div class="hidden sm:flex sm:items-center sm:justify-start">
        <nav class="flex items-center gap-1.5" aria-label="Pagination">
          <button app-button variant="unstyled"
            type="button"
            [disabled]="currentPage <= 1"
            (click)="onPageChange(currentPage - 1)"
            aria-label="Previous page"
            class="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <svg
              class="size-4 rtl:rotate-180"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          @for (item of pages; track $index) {
            @if (item === 'ellipsis-start' || item === 'ellipsis-end') {
              <span class="flex size-9 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                ...
              </span>
            } @else {
              <button app-button variant="unstyled"
                type="button"
                (click)="onPageChange(toNumber(item))"
                class="flex size-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition"
                [class]="
                  currentPage === item
                    ? 'border-brand-500 bg-brand-500 text-white shadow-theme-xs dark:border-brand-500 dark:bg-brand-500'
                    : 'border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5'
                "
              >
                {{ item }}
              </button>
            }
          }

          <button app-button variant="unstyled"
            type="button"
            [disabled]="currentPage >= totalPages"
            (click)="onPageChange(currentPage + 1)"
            aria-label="Next page"
            class="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <svg
              class="size-4 rtl:rotate-180"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  `,
})
export class CardFooterComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 10;
  @Output() pageChange = new EventEmitter<number>();
  @Input() className = '';

  toNumber(val: number | string): number {
    return Number(val);
  }

  get pages(): (number | 'ellipsis-start' | 'ellipsis-end')[] {
    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    if (this.currentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis-end', this.totalPages];
    }

    if (this.currentPage >= this.totalPages - 3) {
      return [
        1,
        'ellipsis-start',
        this.totalPages - 4,
        this.totalPages - 3,
        this.totalPages - 2,
        this.totalPages - 1,
        this.totalPages,
      ];
    }

    return [
      1,
      'ellipsis-start',
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      'ellipsis-end',
      this.totalPages,
    ];
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
