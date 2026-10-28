import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  private resolvedDarkSubject = new BehaviorSubject<boolean>(false);
  theme$ = this.themeSubject.asObservable();
  isDarkMode$ = this.resolvedDarkSubject.asObservable();

  private mediaQueryListener?: (e: MediaQueryListEvent) => void;

  constructor() {
    const savedTheme = (typeof localStorage !== 'undefined' ? (localStorage.getItem('theme-mode') || localStorage.getItem('theme')) : null) as Theme | null;
    const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'auto' ? savedTheme : 'light';
    this.setTheme(initialTheme);
  }

  toggleTheme() {
    const nextTheme: Theme = this.resolvedDarkSubject.value ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  isDarkMode(): boolean {
    return this.resolvedDarkSubject.value;
  }

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme-mode', theme);
      localStorage.setItem('theme', theme);
    }

    if (theme === 'auto') {
      this.setupAutoTheme();
    } else {
      this.cleanupAutoListener();
      this.applyTheme(theme);
    }
  }

  private setupAutoTheme() {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const resolved: ResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
    this.applyTheme(resolved);

    this.cleanupAutoListener();
    this.mediaQueryListener = (e: MediaQueryListEvent) => {
      if (this.themeSubject.value === 'auto') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  private cleanupAutoListener() {
    if (typeof window !== 'undefined' && this.mediaQueryListener) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.mediaQueryListener);
      this.mediaQueryListener = undefined;
    }
  }

  private applyTheme(resolvedTheme: ResolvedTheme) {
    const isDark = resolvedTheme === 'dark';

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      this.resolvedDarkSubject.next(isDark);
      root.classList.toggle('dark', isDark);
      root.dataset['theme'] = isDark ? 'dark' : 'light';
      root.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
      root.style.colorScheme = isDark ? 'dark' : 'light';

      if (document.body) {
        document.body.dataset['theme'] = isDark ? 'dark' : 'light';
        document.body.style.colorScheme = isDark ? 'dark' : 'light';
      }
    }
  }
}
