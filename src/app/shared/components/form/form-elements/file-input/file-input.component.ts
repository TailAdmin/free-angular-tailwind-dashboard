import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { DefaultFileInputComponent } from './default-file-input.component';

@Component({
  selector: 'app-file-input',
  imports: [ComponentCardComponent, DefaultFileInputComponent],
  host: {
    class: 'block',
  },
  template: `
    <app-component-card title="File Input">
      <div class="space-y-6">
        <app-default-file-input />
      </div>
    </app-component-card>
  `,
})
export class FileInputComponent {}
