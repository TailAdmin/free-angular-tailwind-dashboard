import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { AddressComponent } from './address';
import { DangerComponent } from './danger';
import { PersonalInformationComponent } from './personal-information';
import { SecurityComponent } from './security';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    PersonalInformationComponent,
    AddressComponent,
    SecurityComponent,
    DangerComponent,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {}
