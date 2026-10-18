import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input, Output, EventEmitter, ElementRef, inject, OnInit, OnChanges } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link'
  /** No built-in look: only the classes passed in. Used to adopt `app-button` without changing a design. */
  | 'unstyled';

export type ButtonSize =
  | 'default'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'icon'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-lg';

@Component({
  selector: 'app-button, button[app-button], a[app-button]',
  imports: [CommonModule, SafeHtmlPipe],
  // spartan-ng brain: disabled state (tabindex / disabled attribute / data-disabled)
  hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
  host: {
    '[attr.data-slot]': '"button"',
    '[class.pointer-events-none]': 'disabled && variant !== "unstyled"',
    '[class.opacity-50]': 'disabled && variant !== "unstyled"',
    '(click)': 'onClick($event)',
    '(keydown.enter)': 'onKeyActivate($event)',
    '(keydown.space)': 'onKeyActivate($event)',
  },
  template: `
    @if (startIcon) {
      <span class="inline-flex shrink-0 items-center" [innerHTML]="startIcon | safeHtml"></span>
    }
    <ng-content></ng-content>
    @if (endIcon) {
      <span class="inline-flex shrink-0 items-center" [innerHTML]="endIcon | safeHtml"></span>
    }
  `,
})
export class ButtonComponent implements OnInit, OnChanges {
  private elementRef = inject(ElementRef);

  get isNativeControl(): boolean {
    const tag = this.elementRef.nativeElement?.tagName?.toLowerCase();
    return tag === 'button' || tag === 'a';
  }

  // role / type / aria attributes are written imperatively so a template that already sets them
  // (e.g. `role="tab"`, `aria-label`) is never overwritten or removed.
  private readonly ownedAttrs = new Set<string>();

  private setOwnedAttr(name: string, value: string | null): void {
    const el = this.elementRef.nativeElement as HTMLElement;
    if (value === null) {
      if (this.ownedAttrs.has(name)) {
        el.removeAttribute(name);
        this.ownedAttrs.delete(name);
      }
      return;
    }
    if (!this.ownedAttrs.has(name) && el.hasAttribute(name)) return;
    el.setAttribute(name, value);
    this.ownedAttrs.add(name);
  }

  private appliedClasses: string[] = [];

  // classes are toggled imperatively so classes set by the template (static `class`, `[ngClass]`) are never replaced
  private syncClasses(): void {
    const el = this.elementRef.nativeElement as HTMLElement;
    const next = this.buttonClasses.split(/\s+/).filter(Boolean);
    const keep = new Set(next);
    for (const c of this.appliedClasses) if (!keep.has(c)) el.classList.remove(c);
    for (const c of next) el.classList.add(c);
    this.appliedClasses = next;
  }

  ngOnChanges(): void {
    this.syncAttributes();
    this.syncClasses();
  }

  private syncAttributes(): void {
    this.setOwnedAttr('role', this.isAnchor ? 'link' : 'button');
    this.setOwnedAttr('type', this.isAnchor ? null : this.type);
    this.setOwnedAttr('aria-label', this.ariaLabel || null);
    this.setOwnedAttr('aria-disabled', this.disabled ? 'true' : null);
  }

  ngOnInit(): void {
    this.syncAttributes();
    this.syncClasses();
    // `<app-button>` renders a custom element: make it reachable with the keyboard.
    const el = this.elementRef.nativeElement as HTMLElement;
    if (!this.isNativeControl && !el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', this.disabled ? '-1' : '0');
    }
  }

  get isAnchor(): boolean {
    return this.elementRef.nativeElement?.tagName?.toLowerCase() === 'a';
  }

  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() className: string = '';
  @Input() startIcon?: string;
  @Input() endIcon?: string;

  @Output() btnClick = new EventEmitter<Event>();

  @Input('class') classOverride?: string;

  get normalizedVariant(): 'default' | 'outline' | 'ghost' | 'destructive' | 'link' | 'unstyled' {
    if (this.variant === 'primary') return 'default';
    return this.variant;
  }

  get normalizedSize(): 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' {
    if (this.size === 'md') return 'default';
    return this.size;
  }

  get buttonClasses(): string {
    if (this.variant === 'unstyled') {
      return `${this.className} ${this.classOverride || ''}`.trim();
    }
    const baseClasses =
      "group/button inline-flex shrink-0 items-center justify-center border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:outline-hidden active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-500/50 dark:aria-invalid:ring-red-500/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 cursor-pointer";

    const userClasses = `${this.className} ${this.classOverride || ''}`
      .split(/\s+/)
      .filter(Boolean);
    const hasCustomTextColor = userClasses.some(
      (c) =>
        !c.includes(':') &&
        c.startsWith('text-') &&
        !/^(text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|title|heading|left|right|center|justify|start|end))/.test(
          c
        )
    );
    const hasCustomDarkTextColor = userClasses.some(
      (c) =>
        c.startsWith('dark:text-') &&
        !/^(dark:text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|title|heading|left|right|center|justify|start|end))/.test(
          c
        )
    );

    const defaultLinkColors = [
      hasCustomTextColor ? '' : 'text-brand-500',
      hasCustomDarkTextColor ? '' : 'dark:text-brand-400',
    ]
      .filter(Boolean)
      .join(' ');

    const variantClasses: Record<string, string> = {
      default:
        'border-transparent bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 focus-visible:ring-3 focus-visible:ring-brand-500/20 disabled:bg-brand-200 disabled:text-white dark:bg-brand-500 dark:hover:bg-brand-600 dark:disabled:bg-brand-800 dark:disabled:text-brand-400',
      outline:
        'border-gray-300 bg-transparent text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-3 focus-visible:ring-gray-300/50 disabled:border-gray-200 disabled:bg-white disabled:text-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-600',
      ghost:
        'border-transparent bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-3 focus-visible:ring-gray-300/50 disabled:border-gray-200 disabled:bg-white disabled:text-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-600',
      destructive:
        'border-transparent bg-red-500 text-white shadow-theme-xs hover:bg-red-600 focus-visible:ring-3 focus-visible:ring-red-500/20 disabled:bg-red-200 disabled:text-white dark:bg-red-500 dark:hover:bg-red-600 dark:disabled:bg-red-950 dark:disabled:text-red-400',
      link: `border-transparent h-auto! p-0! font-normal underline-offset-4 hover:underline ${defaultLinkColors}`.trim(),
    };

    const sizeClasses: Record<string, string> = {
      default:
        'h-10 gap-2 rounded-[10px] px-4 py-2.5 [&:has(>svg:first-child)]:ps-3 [&:has(>svg:last-child)]:pe-3',
      xs: 'h-8 gap-1.5 rounded-lg px-3 py-1.5 in-data-[slot=button-group]:rounded-lg [&:has(>svg:first-child)]:ps-2.5 [&:has(>svg:last-child)]:pe-2.5',
      sm: 'h-9 gap-1.5 rounded-lg px-4 py-2 in-data-[slot=button-group]:rounded-lg [&:has(>svg:first-child)]:ps-3 [&:has(>svg:last-child)]:pe-3',
      lg: 'h-11 gap-2 rounded-[10px] px-5 py-3 [&:has(>svg:first-child)]:ps-4 [&:has(>svg:last-child)]:pe-4',
      icon: 'size-10 rounded-[10px]',
      'icon-xs': 'size-8 rounded-lg in-data-[slot=button-group]:rounded-lg',
      'icon-sm': 'size-9 rounded-lg in-data-[slot=button-group]:rounded-lg',
      'icon-lg': 'size-11 rounded-[10px]',
    };

    const hasCustomGap = userClasses.some((c) => /^gap-[\d\.]+$/.test(c));
    const hasCustomRadius = userClasses.some((c) =>
      /\brounded(-[\w\[\]]+)?\b/.test(c)
    );
    const hasCustomHeight = userClasses.some((c) =>
      /^(h-[\w\[\]]+|size-[\w\[\]]+)/.test(c)
    );
    const hasCustomPadding = userClasses.some((c) =>
      /^p[xyse-]?\-[\w\[\]]+/.test(c)
    );
    const hasCustomSize = userClasses.some((c) =>
      /^size-[\w\[\]]+/.test(c)
    );

    let sizeClass = sizeClasses[this.normalizedSize] || sizeClasses['default'];
    if (hasCustomGap) {
      sizeClass = sizeClass.replace(/\bgap-[\d\.]+\b/g, '');
    }
    if (hasCustomRadius) {
      sizeClass = sizeClass.replace(/\brounded(-[\w\[\]]+)?\b/g, '');
    }
    if (hasCustomHeight) {
      sizeClass = sizeClass.replace(/\b(h-[\w\[\]]+|size-[\w\[\]]+)\b/g, '');
    }
    if (hasCustomPadding || hasCustomSize) {
      sizeClass = sizeClass.replace(/\bp[xyse-]?\-[\w\[\]]+\b/g, '');
      sizeClass = sizeClass.replace(/\[&:has\(>svg:[^\]]+\)\]:p[se]-[\w\[\]]+/g, '');
    }

    return `${baseClasses} ${variantClasses[this.normalizedVariant] || variantClasses['default']} ${sizeClass} ${this.className}`
      .replace(/\s+/g, ' ')
      .trim();
  }

  onKeyActivate(event: Event) {
    if (this.isNativeControl) return;
    event.preventDefault();
    if (!this.disabled) {
      (this.elementRef.nativeElement as HTMLElement).click();
    }
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.btnClick.emit(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
