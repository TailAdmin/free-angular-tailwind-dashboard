import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-light-variant-with-leading-icon',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './light-variant-with-leading-icon.component.html',
})
export class LightVariantWithLeadingIconComponent {}
