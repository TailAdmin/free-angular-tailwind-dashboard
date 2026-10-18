import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  imports: [CommonModule, RouterModule]
})
export class DropdownItemComponent {
  @Input() baseClassName =
    'flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-start text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300';
  @Input() className = '';
  @Input() variant: 'default' | 'destructive' = 'default';
  @Output() itemClick = new EventEmitter<void>();
  @Output() click = new EventEmitter<void>();

  private static readonly DESTRUCTIVE =
    'text-red-500 hover:bg-red-50 hover:text-red-600 focus-visible:bg-red-50 focus-visible:text-red-600 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-400';

  get combinedClasses(): string {
    if (this.variant === 'destructive') {
      // destructive owns the colours: drop text-/bg- colour utilities coming from the base and className
      const strip = (v: string) =>
        v
          .split(/\s+/)
          .filter((c) => c && !/^(dark:)?(hover:|focus-visible:)?(text|bg)-(gray|white|red|black)/.test(c))
          .join(' ');
      return `${strip(this.baseClassName)} ${strip(this.className)} ${DropdownItemComponent.DESTRUCTIVE}`.trim();
    }
    return `${this.baseClassName} ${this.className}`.trim();
  }

  handleClick(event: Event) {
    event.preventDefault();
    this.click.emit();
    this.itemClick.emit();
  }
}