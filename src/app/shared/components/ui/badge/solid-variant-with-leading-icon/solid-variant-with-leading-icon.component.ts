import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-solid-variant-with-leading-icon',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './solid-variant-with-leading-icon.component.html',
})
export class SolidVariantWithLeadingIconComponent {}
