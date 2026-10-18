import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  /** Only emit clickOutside when this is true (e.g. pass isMobileOpen). */
  @Input() clickOutsideActive = false;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Guard: only close when the sidebar is actually open.
    // This prevents the hamburger-button click (which opens the sidebar)
    // from immediately re-closing it on the same event.
    if (!this.clickOutsideActive) return;
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}