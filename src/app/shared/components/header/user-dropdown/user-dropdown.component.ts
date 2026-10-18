import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DropdownService } from '../../../services/dropdown.service';
import { ButtonComponent } from '../../ui/button/button.component';

interface Language {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  badge?: string;
}

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports: [ButtonComponent, CommonModule, RouterModule]
})
export class UserDropdownComponent implements OnInit, OnDestroy {
  readonly dropdownId = 'user-dropdown';
  isOpen = false;
  subDropdownOpen = false;
  currentLocale = 'en';

  languages: Language[] = [
    {
      id: 'en',
      name: 'English',
      shortName: 'English',
      flag: 'flag-us.svg',
    },
    {
      id: 'ar',
      name: 'Arabic (Saudi)',
      shortName: 'Arabic',
      flag: 'flag-sa.svg',
      badge: 'RTL',
    },
    {
      id: 'es',
      name: 'Español',
      shortName: 'Español',
      flag: 'flag-es.svg',
    },
    {
      id: 'de',
      name: 'Deutsch',
      shortName: 'Deutsch',
      flag: 'flag-de.svg',
    },
  ];

  private sub = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private dropdownService: DropdownService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const savedDir = localStorage.getItem('dir');
    const isRtl = savedDir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl';
    this.currentLocale = isRtl ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    this.sub.add(
      this.dropdownService.activeDropdown$.subscribe((activeId) => {
        this.isOpen = activeId === this.dropdownId;
        if (!this.isOpen) {
          this.subDropdownOpen = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.clearSubCloseTimer();
    this.sub.unsubscribe();
  }

  get currentLang(): Language {
    return this.languages.find((l) => l.id === this.currentLocale) || this.languages[0];
  }

  toggleDropdown(event?: Event): void {
    event?.stopPropagation();
    this.dropdownService.toggle(this.dropdownId);
  }

  closeDropdown(): void {
    this.dropdownService.close(this.dropdownId);
  }

  private subCloseTimer?: ReturnType<typeof setTimeout>;

  toggleSubDropdown(event: Event): void {
    event.stopPropagation();
    this.clearSubCloseTimer();
    this.subDropdownOpen = !this.subDropdownOpen;
  }

  /** Language flyout opens on hover (like Next.js). */
  openSubDropdown(): void {
    this.clearSubCloseTimer();
    this.subDropdownOpen = true;
  }

  /** Small delay so the pointer can travel from the trigger to the flyout. */
  scheduleCloseSubDropdown(): void {
    this.clearSubCloseTimer();
    this.subCloseTimer = setTimeout(() => {
      this.subDropdownOpen = false;
      this.cdr.detectChanges();
    }, 120);
  }

  private clearSubCloseTimer(): void {
    if (this.subCloseTimer) {
      clearTimeout(this.subCloseTimer);
      this.subCloseTimer = undefined;
    }
  }

  selectLanguage(id: string, event?: Event): void {
    event?.stopPropagation();
    this.currentLocale = id;
    const dir = id === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('dir', dir);
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}