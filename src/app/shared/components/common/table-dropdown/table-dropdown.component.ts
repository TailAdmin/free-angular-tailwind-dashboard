import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { createPopper, Instance } from '@popperjs/core';

@Component({
  selector: 'app-table-dropdown',
  imports: [CommonModule],
  templateUrl: './table-dropdown.component.html',
  styles: ``
})
export class TableDropdownComponent implements AfterViewInit, OnDestroy {
  @Input() dropdownButton: any;
  @Input() dropdownContent: any;
  @ViewChild('buttonRef') buttonRef!: ElementRef<HTMLDivElement>;
  @ViewChild('contentRef') contentRef!: ElementRef<HTMLDivElement>;
  
  isOpen = false;
  private popperInstance: Instance | null = null;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.buttonRef && this.contentRef) {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      this.popperInstance = createPopper(
        this.buttonRef.nativeElement,
        this.contentRef.nativeElement,
        {
          placement: isRtl ? 'bottom-start' : 'bottom-end',
          strategy: 'fixed',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: [
                  isRtl ? 'top-start' : 'top-end',
                  isRtl ? 'bottom-start' : 'bottom-end',
                ],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                padding: 12,
                altAxis: true,
              },
            },
          ],
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;

    // 1. Clicked inside the toggle button: toggle open/close
    if (this.buttonRef?.nativeElement.contains(target)) {
      this.isOpen = !this.isOpen;
      this.updatePopper();
      this.cdr.markForCheck();
      return;
    }

    // 2. Clicked inside the dropdown menu (e.g. clicked an item): close menu
    if (this.contentRef?.nativeElement.contains(target)) {
      if (this.isOpen) {
        this.isOpen = false;
        this.cdr.markForCheck();
      }
      return;
    }

    // 3. Clicked outside anywhere else: close menu if open
    if (this.isOpen) {
      this.isOpen = false;
      this.cdr.markForCheck();
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updatePopper();
    this.cdr.markForCheck();
  }

  private updatePopper() {
    if (this.isOpen && this.popperInstance) {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      this.popperInstance.setOptions((options) => ({
        ...options,
        placement: isRtl ? 'bottom-start' : 'bottom-end',
        modifiers: [
          ...(options.modifiers || []),
          {
            name: 'flip',
            options: {
              fallbackPlacements: [
                isRtl ? 'top-start' : 'top-end',
                isRtl ? 'bottom-start' : 'bottom-end',
              ],
            },
          },
        ],
      }));
      requestAnimationFrame(() => {
        if (this.popperInstance) {
          this.popperInstance.update();
        }
      });
    }
  }
}
