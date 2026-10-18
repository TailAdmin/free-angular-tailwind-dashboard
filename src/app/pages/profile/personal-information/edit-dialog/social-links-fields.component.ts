import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalInfoFormData } from './types';
import { InputDirective } from '../../../../shared/components/ui/input/input.directive';

@Component({
  selector: 'app-social-links-fields',
  imports: [InputDirective, CommonModule, FormsModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        Social Links
      </h3>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Facebook
          </label>
          <input app-input unstyled
            type="url"
            [(ngModel)]="formData.facebook"
            placeholder="https://facebook.com/username"
            class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
          />
        </div>

        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            X.com
          </label>
          <input app-input unstyled
            type="url"
            [(ngModel)]="formData.x"
            placeholder="https://x.com/username"
            class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
          />
        </div>

        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Linkedin
          </label>
          <input app-input unstyled
            type="url"
            [(ngModel)]="formData.linkedin"
            placeholder="https://linkedin.com/in/username"
            class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
          />
        </div>

        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Instagram
          </label>
          <input app-input unstyled
            type="url"
            [(ngModel)]="formData.instagram"
            placeholder="https://instagram.com/username"
            class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
          />
        </div>
      </div>
    </div>
  `
})
export class SocialLinksFieldsComponent {
  @Input() formData!: PersonalInfoFormData;
}
