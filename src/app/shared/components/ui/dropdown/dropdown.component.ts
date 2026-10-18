import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  imports: [CommonModule]
})
export class DropdownComponent implements AfterViewInit, OnDestroy {
  @Input() className = '';
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  dropdownRef!: ElementRef<HTMLDivElement>;

  @ViewChild('dropdownRef') set dropdownRefSetter(ref: ElementRef<HTMLDivElement> | undefined) {
    this.dropdownRef = ref as ElementRef<HTMLDivElement>;
    this.stopTracking();
    if (ref) requestAnimationFrame(() => this.escapeClipping(ref.nativeElement));
  }

  private stopTracking: () => void = () => {};

  /**
   * When an ancestor with `overflow` clipping (table wrapper, scroll area) would hide the panel,
   * pin it with `position: fixed` at the spot it was laid out, so it is never cut off (like a portal).
   */
  private escapeClipping(el: HTMLElement) {
    const anchor = this.elementRef.nativeElement.parentElement as HTMLElement | null;
    if (!anchor || !el.isConnected) return;
    const rect = el.getBoundingClientRect();
    let node: HTMLElement | null = el.parentElement;
    let clipped = false;
    while (node && node !== document.body) {
      const cs = getComputedStyle(node);
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        const r = node.getBoundingClientRect();
        if (rect.left < r.left - 0.5 || rect.right > r.right + 0.5 || rect.top < r.top - 0.5 || rect.bottom > r.bottom + 0.5) {
          clipped = true;
          break;
        }
      }
      node = node.parentElement;
    }
    if (!clipped) return;
    const a = anchor.getBoundingClientRect();
    const dx = rect.left - a.left;
    const dy = rect.top - a.top;
    const place = () => {
      const ar = anchor.getBoundingClientRect();
      el.style.position = 'fixed';
      el.style.inset = 'auto';
      el.style.margin = '0';
      el.style.left = `${ar.left + dx}px`;
      el.style.top = `${ar.top + dy}px`;
    };
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    this.stopTracking = () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }

  get dropdownClasses(): string {
    const base = "absolute z-40 mt-2 flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]";
    const hasCustomPadding = /\bp-/.test(this.className);
    const padding = hasCustomPadding ? "" : "p-3";
    const hasCustomMinW = /\bmin-w-/.test(this.className);
    const minW = hasCustomMinW ? "" : "min-w-65";
    const align = (this.className.includes("right-") || this.className.includes("left-") || this.className.includes("start-") || this.className.includes("end-")) ? "" : "ltr:right-0 rtl:left-0";
    return `${base} ${padding} ${minW} ${align} ${this.className}`.replace(/\s+/g, " ").trim();
  }

  constructor(private elementRef: ElementRef) {}

  private handleClickOutside = (event: MouseEvent) => {
    if (
      this.isOpen &&
      this.dropdownRef &&
      this.dropdownRef.nativeElement &&
      !this.dropdownRef.nativeElement.contains(event.target as Node)
    ) {
      const parentContainer = this.elementRef.nativeElement.parentElement;
      const clickedToggle = (event.target as HTMLElement).closest('.dropdown-toggle');
      if (clickedToggle && parentContainer && parentContainer.contains(clickedToggle)) {
        return;
      }
      this.close.emit();
    }
  };

  ngAfterViewInit() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  ngOnDestroy() {
    this.stopTracking();
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}