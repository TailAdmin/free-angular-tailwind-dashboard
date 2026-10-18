import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalInfo } from '../types';
import { AvatarUploadSectionComponent } from './avatar-upload-section.component';
import { PersonalDetailsFieldsComponent } from './personal-details-fields.component';
import { validatePersonalInfo } from './schema';
import { SocialLinksFieldsComponent } from './social-links-fields.component';
import { PersonalInfoErrors, PersonalInfoFormData } from './types';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-edit-personal-info-dialog',
  imports: [ButtonComponent, 
    CommonModule,
    FormsModule,
    AvatarUploadSectionComponent,
    PersonalDetailsFieldsComponent,
    SocialLinksFieldsComponent,
  ],
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
          class="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-[#1E2635]"
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

          <div class="max-h-[90vh] overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <!-- Header -->
            <div class="flex flex-col gap-1 pe-10 sm:gap-2">
              <h3 class="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-white/90">
                Edit Personal Information
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Update your details to keep your profile up-to-date.
              </p>
            </div>

            <form (ngSubmit)="onSubmit()" class="mt-4 flex flex-col gap-6" noValidate>
              <app-avatar-upload-section
                class="block"
                [previewAvatarUrl]="previewAvatarUrl"
                [fullName]="initialData.fullName"
                [fallbackLetter]="initialLetter"
                (avatarChange)="avatarFileUrl = $event"
              />

              <app-personal-details-fields
                class="block"
                [formData]="formData"
                [errors]="errors"
                (fieldChange)="clearError($event)"
              />

              <app-social-links-fields class="block" [formData]="formData" />

              <!-- Footer Actions -->
              <div class="flex flex-col-reverse justify-end gap-3 pt-3 sm:flex-row">
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
      </div>
    }
  `
})
export class EditPersonalInfoDialogComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() initialData!: PersonalInfo;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<PersonalInfo>();

  avatarFileUrl: string | null = null;
  formData: PersonalInfoFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    facebook: '',
    x: '',
    linkedin: '',
    instagram: '',
    avatarUrl: '',
  };
  errors: PersonalInfoErrors = {};

  get previewAvatarUrl(): string {
    return this.avatarFileUrl || this.formData.avatarUrl || this.initialData?.avatarUrl || '/images/user/user-01.jpg';
  }

  get initialLetter(): string {
    const name = this.formData.firstName?.trim() || this.initialData?.firstName?.trim() || 'M';
    return name[0].toUpperCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue || changes['initialData']?.currentValue) {
      if (this.initialData) {
        this.avatarFileUrl = null;
        this.errors = {};
        this.formData = {
          firstName: this.initialData.firstName || '',
          lastName: this.initialData.lastName || '',
          email: this.initialData.email || '',
          phone: this.initialData.phone || '',
          bio: this.initialData.bio || '',
          facebook: this.initialData.socialLinks?.facebook || '',
          x: this.initialData.socialLinks?.x || '',
          linkedin: this.initialData.socialLinks?.linkedin || '',
          instagram: this.initialData.socialLinks?.instagram || '',
          avatarUrl: this.initialData.avatarUrl || '',
        };
      }
    }
  }

  clearError(field: keyof PersonalInfoFormData) {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  closeModal() {
    this.avatarFileUrl = null;
    this.openChange.emit(false);
  }

  onSubmit() {
    this.errors = validatePersonalInfo(this.formData);
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    const updatedFullName = `${this.formData.firstName.trim()} ${this.formData.lastName.trim()}`.trim();
    const updated: PersonalInfo = {
      ...this.initialData,
      avatarUrl: this.previewAvatarUrl,
      fullName: updatedFullName || this.initialData.fullName,
      firstName: this.formData.firstName.trim(),
      lastName: this.formData.lastName.trim(),
      email: this.formData.email.trim(),
      phone: this.formData.phone.trim(),
      bio: this.formData.bio?.trim() ?? '',
      socialLinks: {
        facebook: this.formData.facebook?.trim() ?? '',
        x: this.formData.x?.trim() ?? '',
        linkedin: this.formData.linkedin?.trim() ?? '',
        instagram: this.formData.instagram?.trim() ?? '',
      },
    };

    this.save.emit(updated);
    this.closeModal();
  }
}
export { EditPersonalInfoDialogComponent as EditPersonalInfoDialog };
