import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-solid-variant',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './solid-variant.component.html',
})
export class SolidVariantComponent {}
