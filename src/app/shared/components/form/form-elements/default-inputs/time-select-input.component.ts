import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import flatpickr from 'flatpickr';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-time-select-input',
  imports: [InputDirective, ],
  host: {
    class: 'block',
  },
  template: `
    <div
      role="group"
      data-slot="field"
      data-orientation="vertical"
      class="group/field flex w-full gap-2 data-[invalid=true]:text-red-500 dark:data-[invalid=true]:text-red-400 flex-col *:w-full [&>.sr-only]:w-auto"
    >
      <label
        data-slot="field-label"
        class="group/field-label peer/field-label flex w-fit gap-2 text-sm leading-snug font-medium text-gray-700 select-none group-data-[disabled=true]/field:opacity-50 dark:text-gray-400"
      >
        Time Select Input
      </label>
      <div class="relative">
        <input app-input unstyled
          #timeInputRef
          type="text"
          placeholder="12:00 AM"
          class="h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-10 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40 dark:disabled:border-gray-800 dark:disabled:bg-gray-800/50"
        />
        <span
          class="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.042 10a6.958 6.958 0 1113.916 0 6.958 6.958 0 01-13.916 0zM10 1.542a8.458 8.458 0 100 16.916 8.458 8.458 0 000-16.916zm0 9.208a.75.75 0 01-.75-.75V5.417a.75.75 0 011.5 0V9.25h2.583a.75.75 0 010 1.5H10z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </div>
  `,
})
export class TimeSelectInputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timeInputRef') timeInputRef!: ElementRef<HTMLInputElement>;
  private fp?: flatpickr.Instance;

  ngAfterViewInit() {
    if (this.timeInputRef) {
      this.fp = flatpickr(this.timeInputRef.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'h:i K',
      });
    }
  }

  ngOnDestroy() {
    this.fp?.destroy();
  }
}
