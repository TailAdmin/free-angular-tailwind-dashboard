import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalInfoErrors, PersonalInfoFormData } from './types';
import { InputDirective } from '../../../../shared/components/ui/input/input.directive';
import { TextareaDirective } from '../../../../shared/components/ui/textarea/textarea.directive';

@Component({
  selector: 'app-personal-details-fields',
  imports: [TextareaDirective, InputDirective, CommonModule, FormsModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        Personal Information
      </h3>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name <span class="text-red-500">*</span>
          </label>
          <input app-input unstyled
            type="text"
            [(ngModel)]="formData.firstName"
            (ngModelChange)="onFieldChange('firstName')"
            placeholder="Enter first name"
            class="h-11 w-full rounded-[10px] border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            [ngClass]="
              errors.firstName
                ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
            "
          />
          @if (errors.firstName) {
            <p class="text-xs text-red-500 mt-1">{{ errors.firstName }}</p>
          }
        </div>

        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name <span class="text-red-500">*</span>
          </label>
          <input app-input unstyled
            type="text"
            [(ngModel)]="formData.lastName"
            (ngModelChange)="onFieldChange('lastName')"
            placeholder="Enter last name"
            class="h-11 w-full rounded-[10px] border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            [ngClass]="
              errors.lastName
                ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
            "
          />
          @if (errors.lastName) {
            <p class="text-xs text-red-500 mt-1">{{ errors.lastName }}</p>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input app-input unstyled
            type="email"
            [(ngModel)]="formData.email"
            (ngModelChange)="onFieldChange('email')"
            placeholder="info@example.com"
            class="h-11 w-full rounded-[10px] border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            [ngClass]="
              errors.email
                ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
            "
          />
          @if (errors.email) {
            <p class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          }
        </div>

        <div class="group/field flex w-full flex-col gap-2">
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone <span class="text-red-500">*</span>
          </label>
          <input app-input unstyled
            type="text"
            [(ngModel)]="formData.phone"
            (ngModelChange)="onFieldChange('phone')"
            placeholder="+09 363 398 46"
            class="h-11 w-full rounded-[10px] border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            [ngClass]="
              errors.phone
                ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
            "
          />
          @if (errors.phone) {
            <p class="text-xs text-red-500 mt-1">{{ errors.phone }}</p>
          }
        </div>
      </div>

      <div class="group/field flex w-full flex-col gap-2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea app-textarea unstyled
          [(ngModel)]="formData.bio"
          (ngModelChange)="onFieldChange('bio')"
          rows="3"
          placeholder="Write a brief bio..."
          class="w-full rounded-[10px] border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        ></textarea>
      </div>
    </div>
  `
})
export class PersonalDetailsFieldsComponent {
  @Input() formData!: PersonalInfoFormData;
  @Input() errors: PersonalInfoErrors = {};
  @Output() fieldChange = new EventEmitter<keyof PersonalInfoFormData>();

  onFieldChange(field: keyof PersonalInfoFormData) {
    this.fieldChange.emit(field);
  }
}
