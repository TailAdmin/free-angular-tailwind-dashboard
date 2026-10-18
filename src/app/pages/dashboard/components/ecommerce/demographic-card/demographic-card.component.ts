import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownItemComponent } from '../../../ui/dropdown/dropdown-item/dropdown-item.component';
import { DropdownComponent } from '../../../ui/dropdown/dropdown.component';
import { CountryMapComponent } from '../country-map/country-map.component';
import { ButtonComponent } from '../../../ui/button/button.component';

interface DemographicCountry {
  name: string;
  customers: string;
  percentage: string;
  img: string;
  alt: string;
}

@Component({
  selector: 'app-demographic-card',
  imports: [ButtonComponent, 
    CommonModule,
    CountryMapComponent,
    DropdownComponent,
    DropdownItemComponent,
  ],
  templateUrl: './demographic-card.component.html',
})
export class DemographicCardComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  countries: DemographicCountry[] = [
    {
      img: '/images/flag/usa.png',
      alt: 'USA',
      name: 'USA',
      customers: '2,379 Customers',
      percentage: '40.99%',
    },
    {
      img: '/images/flag/france.png',
      alt: 'France',
      name: 'France',
      customers: '589 Customers',
      percentage: '59.01%',
    },
    {
      img: '/images/flag/yemen.png',
      alt: 'Yemen',
      name: 'Yemen',
      customers: '412 Customers',
      percentage: '32.40%',
    },
  ];
}
