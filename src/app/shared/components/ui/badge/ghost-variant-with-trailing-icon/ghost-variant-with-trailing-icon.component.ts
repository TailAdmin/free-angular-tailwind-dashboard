import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-ghost-variant-with-trailing-icon',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './ghost-variant-with-trailing-icon.component.html',
})
export class GhostVariantWithTrailingIconComponent {}
