import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressItemComponent } from './address-item.component';
import { defaultAddressData } from './data';
import { EditAddressModalComponent } from './edit-address-modal.component';
import { AddressData } from './types';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-address',
  imports: [ButtonComponent, CommonModule, AddressItemComponent, EditAddressModalComponent],
  host: {
    class: 'block',
  },
  template: `
    <div class="group/card flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-700 dark:bg-white/3">
      <div class="flex flex-col gap-6 sm:flex-row lg:items-start lg:justify-between">
        <div class="flex-1">
          <h4 class="mb-4 text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
            Address
          </h4>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <app-address-item label="Country" [value]="address.country" />
            <app-address-item label="City/State" [value]="address.cityState" />
            <app-address-item label="Postal Code" [value]="address.postalCode" />
            <app-address-item label="TAX ID" [value]="address.taxId" />
          </div>
        </div>

        <div>
          <button app-button variant="unstyled"
            type="button"
            (click)="isModalOpen = true"
            class="shadow-theme-xs flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 lg:w-auto cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-5">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.091 3.532a2.25 2.25 0 00-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 00.888.889l3.485-.735a2.25 2.25 0 001.127-.611l8.301-8.302a2.25 2.25 0 000-3.182l-.972-.972zm-2.121 1.06a.75.75 0 011.06 0l.973.973a.75.75 0 010 1.06l-.899.899-2.033-2.033.899-.898zm-1.96 1.96l-6.342 6.342a.75.75 0 00-.203.376l-.498 2.358 2.358-.497a.75.75 0 00.376-.204l6.343-6.342-2.033-2.033z" fill="currentColor"/>
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>

    <app-edit-address-modal
      [isOpen]="isModalOpen"
      [initialData]="address"
      (openChange)="isModalOpen = $event"
      (save)="handleSave($event)"
    />
  `
})
export class AddressComponent {
  address: AddressData = defaultAddressData;
  isModalOpen = false;

  handleSave(updatedData: AddressData) {
    this.address = updatedData;
  }
}
export { AddressComponent as AddressSection };
