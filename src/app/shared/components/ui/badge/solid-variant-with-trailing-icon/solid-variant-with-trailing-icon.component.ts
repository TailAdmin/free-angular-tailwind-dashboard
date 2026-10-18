import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-solid-variant-with-trailing-icon',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './solid-variant-with-trailing-icon.component.html',
})
export class SolidVariantWithTrailingIconComponent {}
