import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-button-group',
  imports: [CommonModule],
  host: {
    '[attr.role]': '"group"',
    '[attr.data-slot]': '"button-group"',
    '[attr.data-orientation]': 'orientation',
    '[attr.aria-label]': 'ariaLabel || null',
    '[class]': 'groupClasses',
  },
  template: `
    <ng-content></ng-content>
  `,
})
export class ButtonGroupComponent {
  @Input() orientation: ButtonGroupOrientation = 'horizontal';
  @Input() ariaLabel: string = '';
  @Input() className: string = '';

  get groupClasses(): string {
    const baseClasses =
      "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1";

    const orientationClasses: Record<ButtonGroupOrientation, string> = {
      horizontal:
        '[&>[data-slot]:has(~[data-slot])]:rounded-e-none [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0',
      vertical:
        'flex-col [&>[data-slot]:has(~[data-slot])]:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0',
    };

    return `${baseClasses} ${orientationClasses[this.orientation]} ${this.className}`.trim();
  }
}
