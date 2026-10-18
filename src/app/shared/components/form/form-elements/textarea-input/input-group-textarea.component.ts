import { Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';
import { TextareaDirective } from '../../../ui/textarea/textarea.directive';

@Component({
  selector: 'app-input-group-textarea',
  imports: [TextareaDirective, ButtonComponent, ],
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
        Message with Actions
      </label>
      <div
        class="group/input-group relative flex flex-col w-full min-w-0 overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <textarea app-textarea unstyled
          placeholder="Write your message or comment..."
          rows="4"
          class="flex-1 resize-none rounded-none border-0 bg-transparent py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        ></textarea>
        <div
          class="flex w-full items-center justify-between border-t border-gray-200 px-3.5 py-2.5 dark:border-gray-800"
        >
          <div class="flex items-center gap-2">
            <button app-button variant="unstyled"
              type="button"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              aria-label="Attach file"
            >
              <svg
                class="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.582 1.542a3.587 3.587 0 013.587 3.587v8.325a2.17 2.17 0 01-4.337 0V5.13a.75.75 0 011.5 0v8.325a.669.669 0 001.337 0v-1.4l-.001-.019V5.13a2.087 2.087 0 00-4.173 0v8.325a3.506 3.506 0 007.01 0v-5.49a.75.75 0 011.5 0v5.49a5.006 5.006 0 01-10.01 0V5.13a3.587 3.587 0 013.587-3.587z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <span class="text-xs text-gray-400">
              Markdown supported
            </span>
          </div>
          <button app-button variant="unstyled"
            type="button"
            class="flex items-center gap-1 rounded-md bg-brand-500 px-2 py-1 text-xs font-medium text-white shadow-none transition-colors hover:bg-brand-600 focus:outline-hidden cursor-pointer"
          >
            <svg
              class="size-3.5"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.985 2.444c-1.872-.873-3.832 1.026-3.02 2.924l1.856 4.337a.75.75 0 010 .59l-1.856 4.337c-.812 1.899 1.148 3.797 3.02 2.925l11.833-5.517c1.733-.808 1.733-3.271 0-4.079L4.985 2.444zm-1.64 2.334c-.271-.633.382-1.265 1.006-.975l11.834 5.518a.75.75 0 010 1.359L4.35 16.197c-.624.29-1.277-.342-1.006-.975L5.2 10.885a2.28 2.28 0 00.054-.138h3.864a.75.75 0 000-1.5H5.252a2.253 2.253 0 00-.052-.132L3.345 4.778z"
                fill="currentColor"
              />
            </svg>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class InputGroupTextareaComponent {}
