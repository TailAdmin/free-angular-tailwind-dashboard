import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'app-light-variant',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './light-variant.component.html',
})
export class LightVariantComponent {}
