import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CALENDAR_VIEW_OPTIONS, CalendarViewOption } from './types';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-view-selector',
  imports: [ButtonComponent, CommonModule],
  template: `
    <div class="calendar-view-dropdown relative">
      <button app-button variant="unstyled"
        type="button"
        (click)="toggleOpen($event)"
        class="calendar-view-btn flex h-9 w-full min-w-18 items-center justify-center gap-1 rounded-lg border border-gray-300 ps-2.5 pe-1.5 text-xs font-medium text-gray-700 shadow-xs sm:min-w-20 sm:gap-1.5 sm:ps-3 sm:pe-2 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        [attr.aria-expanded]="isOpen"
        aria-haspopup="listbox"
      >
        <span class="calendar-view-label">{{ activeOption.label }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="calendar-view-chevron h-4 w-4 transition-transform duration-200 sm:h-4.5 sm:w-4.5"
          [class.rotate-180]="isOpen"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      @if (isOpen) {
        <div class="calendar-view-menu absolute end-0 z-50 mt-1.5 w-36 max-w-[calc(100vw-32px)] space-y-0.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg sm:w-38 dark:border-gray-700 dark:bg-gray-900">
          @for (view of viewOptions; track view.key) {
            <button app-button variant="unstyled"
              type="button"
              [attr.data-view-key]="view.key"
              (click)="handleSelect(view.key)"
              class="calendar-view-option w-full rounded-lg px-2.5 py-1.5 text-start text-xs text-gray-700 hover:bg-gray-100 sm:text-sm dark:text-gray-300 dark:hover:bg-white/5"
              [class.bg-gray-100]="currentView === view.key"
              [class.font-medium]="currentView === view.key"
              [class.dark:bg-white/5]="currentView === view.key"
              [class.font-normal]="currentView !== view.key"
            >
              {{ view.label }}
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class ViewSelectorComponent {
  @Input() currentView = 'dayGridMonth';
  @Output() viewChange = new EventEmitter<string>();

  isOpen = false;
  viewOptions: CalendarViewOption[] = CALENDAR_VIEW_OPTIONS;

  constructor(private elementRef: ElementRef) {}

  get activeOption(): CalendarViewOption {
    return (
      this.viewOptions.find((v) => v.key === this.currentView) ||
      this.viewOptions.find((v) => v.key === 'dayGridMonth') ||
      this.viewOptions[1]
    );
  }

  toggleOpen(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
  }

  handleSelect(viewKey: string) {
    this.viewChange.emit(viewKey);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
