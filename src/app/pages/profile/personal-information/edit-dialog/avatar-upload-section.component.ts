import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-avatar-upload-section',
  imports: [ButtonComponent, CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="space-y-4">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        Change Profile Picture
      </h3>

      <div class="flex items-center gap-4 sm:gap-6">
        <div class="relative">
          <div class="relative flex size-20 shrink-0 overflow-hidden rounded-full sm:size-24">
            @if (previewAvatarUrl) {
              <img
                [src]="previewAvatarUrl"
                [alt]="fullName || 'Profile avatar'"
                class="aspect-square size-full object-cover"
              />
            } @else {
              <div class="flex size-full items-center justify-center bg-cyan-500 text-2xl font-medium text-white dark:bg-cyan-500 dark:text-white">
                {{ fallbackLetter }}
              </div>
            }
          </div>

          <!-- Overlaid Camera Button -->
          <button app-button variant="unstyled"
            type="button"
            (click)="triggerFileInput()"
            class="absolute end-0 bottom-0 flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-theme-xs transition-colors hover:bg-gray-50 hover:text-gray-900 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Upload profile picture"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-4.5">
              <path d="M12.6732 3.41872C12.4373 3.10275 12.066 2.91667 11.6717 2.91667H8.32825C7.93391 2.91667 7.56268 3.10275 7.32672 3.41872L6.83189 4.08131C6.59593 4.39727 6.2247 4.58336 5.83036 4.58336H3.54167C2.85131 4.58336 2.29167 5.14301 2.29167 5.83336V14.375C2.29167 15.0654 2.85131 15.625 3.54167 15.625H16.4583C17.1487 15.625 17.7083 15.0654 17.7083 14.375V5.83336C17.7083 5.14301 17.1487 4.58336 16.4583 4.58336H14.1696C13.7752 4.58336 13.404 4.39727 13.1681 4.08131L12.6732 3.41872Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.3333 9.79329C13.3333 11.6342 11.8409 13.1266 10 13.1266C8.15905 13.1266 6.66667 11.6342 6.66667 9.79329C6.66667 7.95234 8.15905 6.45996 10 6.45996C11.8409 6.45996 13.3333 7.95234 13.3333 9.79329Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <input
            type="file"
            #fileInput
            accept="image/png,image/jpeg,image/webp"
            (change)="handleImageChange($event)"
            class="hidden"
            id="avatar-file-input"
          />
        </div>

        <div class="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
          <p class="font-normal">Upload a square image (200×200 px)</p>
          <p class="font-normal">in JPEG or PNG format.</p>
        </div>
      </div>
    </div>
  `
})
export class AvatarUploadSectionComponent {
  @Input() previewAvatarUrl = '';
  @Input() fullName = '';
  @Input() fallbackLetter = 'M';
  @Output() avatarChange = new EventEmitter<string>();

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  triggerFileInput() {
    this.fileInputRef?.nativeElement?.click();
  }

  handleImageChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.avatarChange.emit(url);
    }
  }
}
