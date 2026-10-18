import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { defaultPersonalInfo } from './data';
import { EditPersonalInfoDialogComponent } from './edit-dialog';
import { InfoFieldComponent } from './info-field.component';
import { SocialLinksComponent } from './social-links.component';
import { PersonalInfo } from './types';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-personal-information',
  imports: [ButtonComponent, 
    CommonModule,
    InfoFieldComponent,
    SocialLinksComponent,
    EditPersonalInfoDialogComponent,
  ],
  host: {
    class: 'block',
  },
  template: `
    <div class="group/card relative flex flex-col gap-5 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-7 dark:border-gray-700 dark:bg-white/3">
      <!-- Top Header Row: Title & Edit Button -->
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90">
          Personal Information
        </h2>

        <button app-button variant="unstyled"
          type="button"
          (click)="isDialogOpen = true"
          class="shadow-theme-xs flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
          <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-4.5">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.091 3.532a2.25 2.25 0 00-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 00.888.889l3.485-.735a2.25 2.25 0 001.127-.611l8.301-8.302a2.25 2.25 0 000-3.182l-.972-.972zm-2.121 1.06a.75.75 0 011.06 0l.973.973a.75.75 0 010 1.06l-.899.899-2.033-2.033.899-.898zm-1.96 1.96l-6.342 6.342a.75.75 0 00-.203.376l-.498 2.358 2.358-.497a.75.75 0 00.376-.204l6.343-6.342-2.033-2.033z" fill="currentColor"/>
          </svg>
          <span>Edit</span>
        </button>
      </div>

      <!-- Profile Pic & Basic Meta -->
      <div class="mt-2 flex items-center gap-4 sm:gap-6">
        <div class="relative flex size-16 shrink-0 overflow-hidden rounded-full sm:size-20">
          @if (profileData.avatarUrl) {
            <img
              [src]="profileData.avatarUrl"
              [alt]="profileData.fullName || 'User profile'"
              class="aspect-square size-full object-cover"
            />
          } @else {
            <div class="flex size-full items-center justify-center bg-brand-400 text-xl font-medium text-white sm:text-2xl dark:bg-brand-400 dark:text-white">
              {{ initialLetter }}
            </div>
          }
        </div>

        <div class="flex flex-col gap-1">
          <h3 class="text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90">
            {{ profileData.fullName }}
          </h3>

          <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            <span>{{ profileData.role }}</span>
            <span class="inline-block h-3.5 w-px bg-gray-300 dark:bg-gray-700"></span>
            <span>{{ profileData.location }}</span>
          </div>
        </div>
      </div>

      <!-- Details & Social Links Grid -->
      <div class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col gap-6">
          <app-info-field label="First Name" [value]="profileData.firstName" />
          <app-info-field label="Email address" [value]="profileData.email" />
        </div>

        <div class="flex flex-col gap-6">
          <app-info-field label="Last Name" [value]="profileData.lastName" />
          <app-info-field label="Phone" [value]="profileData.phone" />
        </div>

        <div class="flex flex-col gap-6">
          <app-info-field label="Bio" [value]="profileData.bio" />
        </div>

        <div class="flex flex-col gap-6">
          <app-social-links [socialLinks]="profileData.socialLinks" />
        </div>
      </div>
    </div>

    <!-- Edit Personal Information Dialog -->
    <app-edit-personal-info-dialog
      [isOpen]="isDialogOpen"
      [initialData]="profileData"
      (openChange)="isDialogOpen = $event"
      (save)="handleSave($event)"
    />
  `
})
export class PersonalInformationComponent implements OnInit {
  @Input() data: PersonalInfo = defaultPersonalInfo;

  profileData: PersonalInfo = defaultPersonalInfo;
  isDialogOpen = false;

  ngOnInit() {
    if (this.data) {
      this.profileData = { ...this.data };
    }
  }

  get initialLetter(): string {
    return this.profileData.firstName?.trim()
      ? this.profileData.firstName.trim()[0].toUpperCase()
      : 'M';
  }

  handleSave(updated: PersonalInfo) {
    this.profileData = updated;
  }
}
export { PersonalInformationComponent as PersonalInformationSection };
