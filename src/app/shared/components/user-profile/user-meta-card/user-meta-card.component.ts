import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { InputFieldComponent } from '../../form/input/input-field.component';

import { ModalComponent } from '../../ui/modal/modal.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-meta-card',
  imports: [
    ModalComponent,
    InputFieldComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './user-meta-card.component.html',
  styles: ``
})
export class UserMetaCardComponent {

  constructor(public modal: ModalService) {}

  isInfoModalOpen = false;
  openInfoModal() { this.isInfoModalOpen = true; }
  closeInfoModal() { this.isInfoModalOpen = false; }

  // Example user data (could be made dynamic)
  user = {
    firstName: 'Chowdury',
    lastName: 'Musharof',
    role: 'Team Manager',
    location: 'Arizona, United States.',
    avatar: '/images/user/owner.png',
    social: {
      facebook: 'https://www.facebook.com/PimjoHQ',
      x: 'https://x.com/PimjoHQ',
      linkedin: 'https://www.linkedin.com/company/pimjohq',
      instagram: 'https://instagram.com/pimjohq',
    },
    email: 'randomuser@pimjo.com',
    phone: '+09 363 398 46',
    bio: 'Team Manager',
  };

  handleInfoSave() {
    console.log('Saving profile changes:', this.user);
    this.closeInfoModal();
  }
}
