import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <button 
        (click)="toggleDropdown()"
        class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800"
      >
        <span class="text-xs font-bold uppercase">{{ currentLang() }}</span>
      </button>

      @if (isOpen()) {
        <div class="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          @for (lang of languages; track lang.code) {
            <button 
              (click)="selectLanguage(lang.code)"
              class="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              [class.font-bold]="currentLang() === lang.code"
            >
              {{ lang.label }}
            </button>
          }
        </div>
      }
    </div>
  `
})
export class LanguageSelectorComponent {
  isOpen = signal(false);
  currentLang = signal('EN');

  languages = [
    { code: 'EN', label: 'English' },
    { code: 'ZH', label: '中文' }
  ];

  constructor(private translate: TranslateService) {}

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  selectLanguage(code: string) {
    // This is the trigger that automatically updates the entire app
    this.translate.use(code.toLowerCase());
    this.currentLang.set(code);
    this.isOpen.set(false);
  }
}