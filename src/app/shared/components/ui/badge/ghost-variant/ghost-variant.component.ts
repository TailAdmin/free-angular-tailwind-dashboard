import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-ghost-variant',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './ghost-variant.component.html',
})
export class GhostVariantComponent {}
