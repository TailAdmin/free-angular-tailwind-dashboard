import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { validateAddress } from './schema';
import type { AddressData } from './types';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { InputDirective } from '../../../shared/components/ui/input/input.directive';

@Component({
  selector: 'app-edit-address-modal',
  imports: [InputDirective, ButtonComponent, CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-99999 flex items-center justify-center p-4 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          (click)="onClose()"
        ></div>

        <!-- Modal Content / Card -->
        <div
          class="relative w-full max-w-[calc(100%-2rem)] sm:max-w-146 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635] z-10 my-auto"
          (click)="$event.stopPropagation()"
        >
          <!-- Top-end circular close button -->
          <button app-button variant="unstyled"
            type="button"
            (click)="onClose()"
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
          <div class="pe-14 text-start">
            <h3
              class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white/90"
            >
              Edit Address
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <!-- Form fields -->
          <form (ngSubmit)="onSubmit($event)" class="mt-6 space-y-6" noValidate>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <!-- Country -->
              <div class="flex flex-col gap-1.5">
                <label
                  for="address-country"
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Country
                </label>
                <input app-input unstyled
                  id="address-country"
                  type="text"
                  [(ngModel)]="formData.country"
                  name="country"
                  placeholder="Country"
                  class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
                  [ngClass]="{
                    'border-red-500 focus:border-red-500 focus:ring-red-500/20':
                      errors.country
                  }"
                />
                @if (errors.country) {
                  <span class="text-xs text-red-500">{{ errors.country }}</span>
                }
              </div>

              <!-- City/State -->
              <div class="flex flex-col gap-1.5">
                <label
                  for="address-city-state"
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  City/State
                </label>
                <input app-input unstyled
                  id="address-city-state"
                  type="text"
                  [(ngModel)]="formData.cityState"
                  name="cityState"
                  placeholder="City/State"
                  class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
                  [ngClass]="{
                    'border-red-500 focus:border-red-500 focus:ring-red-500/20':
                      errors.cityState
                  }"
                />
                @if (errors.cityState) {
                  <span class="text-xs text-red-500">{{
                    errors.cityState
                  }}</span>
                }
              </div>

              <!-- Postal Code -->
              <div class="flex flex-col gap-1.5">
                <label
                  for="address-postal-code"
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Postal Code
                </label>
                <input app-input unstyled
                  id="address-postal-code"
                  type="text"
                  [(ngModel)]="formData.postalCode"
                  name="postalCode"
                  placeholder="Postal Code"
                  class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
                  [ngClass]="{
                    'border-red-500 focus:border-red-500 focus:ring-red-500/20':
                      errors.postalCode
                  }"
                />
                @if (errors.postalCode) {
                  <span class="text-xs text-red-500">{{
                    errors.postalCode
                  }}</span>
                }
              </div>

              <!-- TAX ID -->
              <div class="flex flex-col gap-1.5">
                <label
                  for="address-tax-id"
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  TAX ID
                </label>
                <input app-input unstyled
                  id="address-tax-id"
                  type="text"
                  [(ngModel)]="formData.taxId"
                  name="taxId"
                  placeholder="TAX ID"
                  class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
                  [ngClass]="{
                    'border-red-500 focus:border-red-500 focus:ring-red-500/20':
                      errors.taxId
                  }"
                />
                @if (errors.taxId) {
                  <span class="text-xs text-red-500">{{ errors.taxId }}</span>
                }
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex justify-end gap-3 pt-2">
              <button app-button variant="unstyled"
                type="button"
                (click)="onClose()"
                class="h-11 rounded-[10px] border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button app-button variant="unstyled"
                type="submit"
                class="h-11 rounded-[10px] bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class EditAddressModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() initialData: AddressData = {
    country: '',
    cityState: '',
    postalCode: '',
    taxId: '',
  };
  @Output() openChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<AddressData>();

  formData: AddressData = {
    country: '',
    cityState: '',
    postalCode: '',
    taxId: '',
  };

  errors: Partial<Record<keyof AddressData, string>> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.formData = { ...this.initialData };
      this.errors = {};
    }
  }

  onClose() {
    this.openChange.emit(false);
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.errors = validateAddress(this.formData);
    if (Object.keys(this.errors).length === 0) {
      this.save.emit({ ...this.formData });
      this.openChange.emit(false);
    }
  }
}
