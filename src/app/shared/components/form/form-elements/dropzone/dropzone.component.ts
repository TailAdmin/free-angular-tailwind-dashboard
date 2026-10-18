import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { DropzoneInputComponent } from './dropzone-input.component';

@Component({
  selector: 'app-dropzone',
  host: { class: 'block' },
  imports: [ComponentCardComponent, DropzoneInputComponent],
  templateUrl: './dropzone.component.html',
})
export class DropzoneComponent {}
