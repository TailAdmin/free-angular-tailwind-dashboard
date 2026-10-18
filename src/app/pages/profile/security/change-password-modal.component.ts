import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { validateChangePassword } from './schema';
import { ChangePasswordErrors, ChangePasswordFormData } from './types';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { InputDirective } from '../../../shared/components/ui/input/input.directive';

@Component({
  selector: 'app-change-password-modal',
  imports: [InputDirective, ButtonComponent, CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-99999 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          (click)="closeModal()"
        ></div>

        <!-- Dialog Box -->
        <div
          class="relative w-full max-w-[calc(100%-2rem)] sm:max-w-146 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-xl dark:border-gray-800 dark:bg-[#1E2635]"
          (click)="$event.stopPropagation()"
        >
          <!-- Close Button -->
          <button app-button variant="unstyled"
            type="button"
            (click)="closeModal()"
            aria-label="Close"
            class="absolute end-3 top-3 z-10 flex size-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
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
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="sr-only">Close</span>
          </button>

          <!-- Header -->
          <div class="mb-5 flex flex-col gap-2 pe-10 text-start">
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white/90">
              Change Password
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Use a strong password to protect your account
            </p>
          </div>

          <form (ngSubmit)="onSubmit()" class="space-y-5" noValidate>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Current Password
              </label>
              <input app-input unstyled
                type="password"
                [(ngModel)]="formData.currentPassword"
                name="currentPassword"
                (ngModelChange)="clearError('currentPassword')"
                placeholder="Enter current password"
                class="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                [ngClass]="
                  errors.currentPassword
                    ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                    : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
                "
              />
              @if (errors.currentPassword) {
                <p class="text-xs text-red-500 mt-1">{{ errors.currentPassword }}</p>
              }
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                New Password
              </label>
              <input app-input unstyled
                type="password"
                [(ngModel)]="formData.newPassword"
                name="newPassword"
                (ngModelChange)="clearError('newPassword')"
                placeholder="Enter new password"
                class="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                [ngClass]="
                  errors.newPassword
                    ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                    : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
                "
              />
              @if (errors.newPassword) {
                <p class="text-xs text-red-500 mt-1">{{ errors.newPassword }}</p>
              }
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Confirm Password
              </label>
              <input app-input unstyled
                type="password"
                [(ngModel)]="formData.confirmPassword"
                name="confirmPassword"
                (ngModelChange)="clearError('confirmPassword')"
                placeholder="Confirm new password"
                class="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                [ngClass]="
                  errors.confirmPassword
                    ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:text-red-400'
                    : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
                "
              />
              @if (errors.confirmPassword) {
                <p class="text-xs text-red-500 mt-1">{{ errors.confirmPassword }}</p>
              }
            </div>

            <!-- Footer -->
            <div class="flex flex-col-reverse justify-end gap-3 pt-2 sm:flex-row">
              <button app-button variant="unstyled"
                type="button"
                (click)="closeModal()"
                class="shadow-theme-xs flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
              >
                Close
              </button>
              <button app-button variant="unstyled"
                type="submit"
                class="shadow-theme-xs flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 cursor-pointer dark:bg-brand-500 dark:hover:bg-brand-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class ChangePasswordModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() submitSuccess = new EventEmitter<ChangePasswordFormData>();

  formData: ChangePasswordFormData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  errors: ChangePasswordErrors = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue) {
      this.formData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
      this.errors = {};
    }
  }

  clearError(field: keyof ChangePasswordFormData) {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  closeModal() {
    this.openChange.emit(false);
  }

  onSubmit() {
    this.errors = validateChangePassword(this.formData);
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    this.submitSuccess.emit({ ...this.formData });
    this.closeModal();
  }
}
export { ChangePasswordModalComponent as ChangePasswordModal };
