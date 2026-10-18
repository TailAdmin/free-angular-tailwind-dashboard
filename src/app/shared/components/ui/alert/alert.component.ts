import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alert',
  imports: [
    CommonModule,
    SafeHtmlPipe,
    RouterModule,
  ],
  templateUrl: './alert.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class AlertComponent {
  @Input() variant: 'default' | 'success' | 'warning' | 'error' | 'destructive' | 'info' = 'default';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() showLink: boolean = false;
  @Input() linkHref: string = '#';
  @Input() linkText: string = 'Learn more';

  get variantClasses() {
    const classes = {
      default: {
        container: 'bg-white border-gray-200 text-gray-700 dark:border-gray-800 dark:bg-[#1E2634] dark:text-gray-300',
        icon: 'text-gray-500 dark:text-gray-400'
      },
      success: {
        container: 'bg-green-50 border-green-500 dark:bg-green-500/10 dark:border-green-500/30',
        icon: 'text-green-500 dark:text-green-400'
      },
      error: {
        container: 'bg-red-50 border-red-500 dark:bg-red-500/10 dark:border-red-500/30',
        icon: 'text-red-500 dark:text-red-400'
      },
      destructive: {
        container: 'bg-red-50 border-red-500 dark:bg-red-500/10 dark:border-red-500/30',
        icon: 'text-red-500 dark:text-red-400'
      },
      warning: {
        container: 'bg-amber-50 border-amber-500 dark:bg-amber-500/10 dark:border-amber-500/30',
        icon: 'text-amber-500 dark:text-amber-400'
      },
      info: {
        container: 'bg-sky-50 border-sky-500 dark:bg-sky-500/10 dark:border-sky-500/30',
        icon: 'text-sky-500 dark:text-sky-400'
      }
    };
    return classes[this.variant] || classes['default'];
  }

  get iconSvg(): string {
    const icons: Record<string, string> = {
      default: (
        `<svg
        class="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>`
      ),
      success: (
        `<svg
        class="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 9l-5.5 5.5L8 12" />
      </svg>`
      ),
      error: (
        `<svg
        class="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 16h.01M12 8v4M15.312 2a2 2 0 011.414.586l4.688 4.688A2 2 0 0122 8.688v6.624a2 2 0 01-.586 1.414l-4.688 4.688a2 2 0 01-1.414.586H8.688a2 2 0 01-1.414-.586l-4.688-4.688A2 2 0 012 15.312V8.688a2 2 0 01.586-1.414l4.688-4.688A2 2 0 018.688 2z" />
      </svg>`
      ),
      destructive: (
        `<svg
        class="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 16h.01M12 8v4M15.312 2a2 2 0 011.414.586l4.688 4.688A2 2 0 0122 8.688v6.624a2 2 0 01-.586 1.414l-4.688 4.688a2 2 0 01-1.414.586H8.688a2 2 0 01-1.414-.586l-4.688-4.688A2 2 0 012 15.312V8.688a2 2 0 01.586-1.414l4.688-4.688A2 2 0 018.688 2z" />
      </svg>`
      ),
      warning: (
        `<svg
        class="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21.73 18l-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3M12 9v4M12 17h.01" />
      </svg>`
      ),
      info: (
        `<svg
        class="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>`
      ),
    };
    return icons[this.variant] || icons['default'];
  }
}
