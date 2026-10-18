import { Component, Input } from '@angular/core';
import { BrnSeparator } from '@spartan-ng/brain/separator';

const BASE =
  'block shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch dark:bg-gray-700';

/** Separator built on spartan-ng `BrnSeparator`. Mirrors the Next.js `Separator`. */
@Component({
  selector: 'app-separator',
  hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }],
  host: { 'data-slot': 'separator', '[class]': 'hostClass' },
  template: '',
})
export class SeparatorComponent {
  @Input() className = '';

  get hostClass(): string {
    return `${BASE} ${this.className}`.trim();
  }
}
