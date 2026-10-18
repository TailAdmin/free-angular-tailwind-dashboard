import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultDangerActions } from './data';
import { DangerActionItem } from './types';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-danger',
  imports: [ButtonComponent, CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="group/card flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-700 dark:bg-white/3">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90">
        {{ title }}
      </h4>

      <div class="mt-1">
        @for (item of items; track item.id; let idx = $index) {
          <div
            class="flex flex-col justify-between gap-4 py-4 first:pt-0 sm:flex-row sm:items-center"
            [ngClass]="idx < items.length - 1 ? 'border-b border-gray-200 pb-4 dark:border-gray-700' : ''"
          >
            <div>
              <h4 class="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
                {{ item.title }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </p>
            </div>
            <div class="flex shrink-0 items-center">
              <button app-button variant="unstyled"
                type="button"
                (click)="handleAction(item.id, item.onClick)"
                class="flex h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer"
                [ngClass]="
                  item.variant === 'danger-outline'
                    ? 'border-red-300 text-red-500 shadow-theme-xs hover:bg-red-50 hover:text-red-600 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10'
                    : 'border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200'
                "
              >
                @if (item.id === 'logout-all') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="size-5 rtl:rotate-180">
                    <path d="M4 12h7.75M8 8l-3.998 4 3.997 4M9.75 4.996V4.25a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v15.5a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                } @else if (item.id === 'delete-account') {
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-5">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.541 3.792a2.25 2.25 0 012.25-2.25h2.417a2.25 2.25 0 012.25 2.25v.25H16.666a.75.75 0 010 1.5h-.29v10.666a2.25 2.25 0 01-2.25 2.25h-8.25a2.25 2.25 0 01-2.25-2.25V5.541h-.292a.75.75 0 110-1.5H6.54v-.25zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 00.75-.75v-2.962zM8.041 4.041h3.917v-.25a.75.75 0 00-.75-.75H8.791a.75.75 0 00-.75.75v.25zM8.334 8a.75.75 0 01.75.75v5a.75.75 0 11-1.5 0v-5a.75.75 0 01.75-.75zm4.083.75a.75.75 0 00-1.5 0v5a.75.75 0 101.5 0v-5z" fill="currentColor"/>
                  </svg>
                }
                <span>{{ item.buttonText }}</span>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class DangerComponent {
  @Input() title = 'Danger Zone';
  @Input() items: DangerActionItem[] = defaultDangerActions;
  @Output() logout = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  handleAction(id: string, customOnClick?: () => void) {
    if (customOnClick) {
      customOnClick();
      return;
    }
    if (id === 'logout-all') {
      this.logout.emit();
    } else if (id === 'delete-account') {
      this.delete.emit();
    }
  }
}
export { DangerComponent as DangerZone };
