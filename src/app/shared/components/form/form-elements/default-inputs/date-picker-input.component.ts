import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import flatpickr from 'flatpickr';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-date-picker-input',
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
        Date Picker Input
      </label>
      <div class="relative">
        <input app-input unstyled
          #dateInputRef
          type="text"
          placeholder="mm/dd/yyy"
          class="h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-10 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40 dark:disabled:border-gray-800 dark:disabled:bg-gray-800/50"
        />
        <span
          class="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
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
        </span>
      </div>
    </div>
  `,
})
export class DatePickerInputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dateInputRef') dateInputRef!: ElementRef<HTMLInputElement>;
  private fp?: flatpickr.Instance;

  ngAfterViewInit() {
    if (this.dateInputRef) {
      this.fp = flatpickr(this.dateInputRef.nativeElement, {
        mode: 'single',
        dateFormat: 'm/d/Y',
      });
    }
  }

  ngOnDestroy() {
    this.fp?.destroy();
  }
}
