import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-copy-input',
  imports: [InputDirective, ButtonComponent, FormsModule],
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
        Website
      </label>
      <div
        class="group/input-group relative flex h-11 w-full min-w-0 items-center overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <input app-input unstyled
          type="text"
          [(ngModel)]="value"
          placeholder="www.tailadmin.com"
          class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-4 pe-2 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        />
        <div
          class="relative flex h-full items-center self-stretch border-s border-gray-200 p-0 dark:border-gray-800"
        >
          <button app-button variant="unstyled"
            type="button"
            (click)="handleCopy()"
            class="flex h-full cursor-pointer items-center gap-1.5 rounded-e-[10px] px-3.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-hidden dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            @if (copied) {
              <svg
                class="size-4 text-green-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span class="text-green-500">Copied!</span>
            } @else {
              <svg
                class="size-4 text-gray-500 dark:text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.588 4.584a.5.5 0 01.5-.5h8.327a.5.5 0 01.5.5v8.329a.5.5 0 01-.5.5H7.088a.5.5 0 01-.5-.5V4.584zm.5-2a2 2 0 00-2 2v.51h-.503a2 2 0 00-2 2v8.322a2 2 0 002 2h8.322a2 2 0 002-2v-.503h.508a2 2 0 002-2V4.584a2 2 0 00-2-2H7.088zm6.319 12.329H7.088a2 2 0 01-2-2V6.594h-.503a.5.5 0 00-.5.5v8.322a.5.5 0 00.5.5h8.322a.5.5 0 00.5-.5v-.503z"
                  fill="currentColor"
                />
              </svg>
              <span>Copy</span>
            }
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CopyInputComponent {
  value = 'www.tailadmin.com';
  copied = false;

  async handleCopy() {
    try {
      await navigator.clipboard.writeText(this.value);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}
