import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangePasswordModalComponent } from './change-password-modal.component';
import { defaultSecuritySettings } from './data';
import { ChangePasswordFormData, SecuritySettings } from './types';
import { SwitchComponent } from '../../../shared/components/ui/switch/switch.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-security',
  imports: [ButtonComponent, CommonModule, ChangePasswordModalComponent, SwitchComponent],
  host: {
    class: 'block',
  },
  template: `
    <div class="group/card flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-700 dark:bg-white/3">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90">
        Security
      </h4>

      <div class="mt-1">
        <div
          class="flex flex-col justify-between gap-4 py-4 first:pt-0 sm:flex-row sm:items-center border-b border-gray-200 pb-4 dark:border-gray-700"
        >
          <div>
            <h4 class="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
              Change Password
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive real-time notifications and team alerts.
            </p>
          </div>
          <div class="flex shrink-0 items-center">
            <button app-button variant="unstyled"
              type="button"
              (click)="isModalOpen = true"
              class="shadow-theme-xs flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-5">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.091 3.532a2.25 2.25 0 00-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 00.888.889l3.485-.735a2.25 2.25 0 001.127-.611l8.301-8.302a2.25 2.25 0 000-3.182l-.972-.972zm-2.121 1.06a.75.75 0 011.06 0l.973.973a.75.75 0 010 1.06l-.899.899-2.033-2.033.899-.898zm-1.96 1.96l-6.342 6.342a.75.75 0 00-.203.376l-.498 2.358 2.358-.497a.75.75 0 00.376-.204l6.343-6.342-2.033-2.033z" fill="currentColor"/>
              </svg>
              <span>Change Password</span>
            </button>
          </div>
        </div>

        <div
          class="flex flex-col justify-between gap-4 py-4 first:pt-0 sm:flex-row sm:items-center"
        >
          <div>
            <h4 class="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
              Two-factor authentication (2FA)
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Keep your account secure by enabling 2FA
            </p>
          </div>
          <div class="flex shrink-0 items-center">
            <app-switch [checked]="twoFactorEnabled" (checkedChange)="toggleTwoFactor()" size="sm" ariaLabel="Toggle two-factor authentication"></app-switch>
          </div>
        </div>
      </div>
    </div>

    <app-change-password-modal
      [isOpen]="isModalOpen"
      (openChange)="isModalOpen = $event"
      (submitSuccess)="handlePasswordSubmit($event)"
    />
  `
})
export class SecurityComponent implements OnInit {
  @Input() initialSettings: SecuritySettings = defaultSecuritySettings;
  @Output() passwordChange = new EventEmitter<ChangePasswordFormData>();
  @Output() twoFactorChange = new EventEmitter<boolean>();

  isModalOpen = false;
  twoFactorEnabled = false;

  ngOnInit() {
    if (this.initialSettings) {
      this.twoFactorEnabled = this.initialSettings.twoFactorEnabled;
    }
  }

  toggleTwoFactor() {
    this.twoFactorEnabled = !this.twoFactorEnabled;
    this.twoFactorChange.emit(this.twoFactorEnabled);
  }

  handlePasswordSubmit(data: ChangePasswordFormData) {
    this.passwordChange.emit(data);
  }
}
export { SecurityComponent as SecuritySection };
