import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { socialProviders } from './data';
import { SocialAuthProvider } from './types';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-social-button',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './social-button.component.html',
  host: {
    class: 'contents',
  },
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class SocialButtonComponent {
  @Input() provider!: SocialAuthProvider;
  @Input() className: string = '';
  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    this.btnClick.emit();
  }
}

@Component({
  selector: 'app-social-buttons',
  imports: [CommonModule, SocialButtonComponent],
  template: `
    <div [class]="'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 ' + className">
      @for (provider of providers; track provider.id) {
        <app-social-button
          [provider]="provider"
          (btnClick)="onSelect(provider.id)"
        />
      }
    </div>
  `,
  host: {
    class: 'contents',
  },
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class SocialButtonsComponent {
  @Input() providers: SocialAuthProvider[] = socialProviders;
  @Input() className: string = '';
  @Output() selectProvider = new EventEmitter<string>();

  onSelect(providerId: string) {
    this.selectProvider.emit(providerId);
  }
}
