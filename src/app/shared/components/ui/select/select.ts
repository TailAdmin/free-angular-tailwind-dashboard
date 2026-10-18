import { ChangeDetectionStrategy, Component, Directive, inject, Input } from '@angular/core';
import {
  BrnPopover,
  BrnPopoverContent,
  provideBrnPopoverConfig,
  provideBrnPopoverDefaultOptions,
} from '@spartan-ng/brain/popover';
import {
  BrnSelect,
  BrnSelectContent,
  BrnSelectItem,
  BrnSelectList,
  BrnSelectTrigger,
  BrnSelectValue,
} from '@spartan-ng/brain/select';

/** Root: select behaviour (`BrnSelect`) + popover positioning (`BrnPopover`). */
@Component({
  selector: 'app-select',
  providers: [
    provideBrnPopoverConfig({ align: 'start', sideOffset: 6 }),
    provideBrnPopoverDefaultOptions({ role: null }),
  ],
  hostDirectives: [
    {
      directive: BrnSelect,
      inputs: ['disabled', 'value', 'isItemEqualToValue', 'itemToString'],
      outputs: ['valueChange'],
    },
    {
      directive: BrnPopover,
      inputs: ['align', 'closeOnOutsidePointerEvents', 'sideOffset', 'state', 'offsetX', 'scrollStrategy'],
      outputs: ['stateChanged', 'closed'],
    },
  ],
  host: { 'data-slot': 'select', class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class SelectRootComponent {}

@Component({
  selector: 'app-select-trigger',
  imports: [BrnSelectTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full' },
  template: `
    <button
      brnSelectTrigger
      data-slot="select-trigger"
      type="button"
      [id]="buttonId"
      [attr.aria-label]="ariaLabel || null"
      [class]="triggerClass"
    >
      <ng-content />
      <svg
        class="size-4 shrink-0 text-gray-500 transition-transform duration-200 group-aria-expanded/select-trigger:rotate-180 group-hover/select-trigger:text-gray-700 dark:text-gray-400 dark:group-hover/select-trigger:text-gray-300 pointer-events-none"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4.792 7.396L10 12.604l5.208-5.208"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `,
})
export class SelectTriggerComponent {
  private static nextId = 0;

  @Input() buttonId = `app-select-trigger-${SelectTriggerComponent.nextId++}`;
  @Input() ariaLabel = '';
  @Input() className = '';

  get triggerClass(): string {
    return `group/select-trigger flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-3.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-all duration-200 select-none hover:border-gray-400 hover:bg-gray-50/50 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 dark:focus:border-brand-500/40 *:data-[slot=select-value]:line-clamp-1 ${this.className}`.trim();
  }
}

@Component({
  selector: 'app-select-value',
  hostDirectives: [{ directive: BrnSelectValue, inputs: ['placeholder'] }],
  host: {
    '[attr.data-slot]': '!_hidden() ? "select-value" : null',
    class: 'min-w-0 truncate data-hidden:hidden text-gray-800 dark:text-white/90 data-[placeholder]:text-gray-400 dark:data-[placeholder]:text-gray-500',
  },
  template: ``,
})
export class SelectValueComponent {
  private readonly _brnSelectValue = inject(BrnSelectValue);
  protected readonly _hidden = this._brnSelectValue.hidden;
}

@Directive({
  selector: '[appSelectPortal]',
  hostDirectives: [{ directive: BrnPopoverContent, inputs: ['context', 'class'] }],
})
export class SelectPortalDirective {}

@Component({
  selector: 'app-select-content',
  imports: [BrnSelectList],
  hostDirectives: [BrnSelectContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'relative flex w-(--brn-select-width) overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg outline-none dark:border-gray-800 dark:bg-[#1E2635] max-h-60 z-50',
  },
  template: `
    <div brnSelectList class="flex w-full flex-col gap-1">
      <ng-content />
    </div>
  `,
})
export class SelectContentComponent {}

@Component({
  selector: 'app-select-item',
  hostDirectives: [{ directive: BrnSelectItem, inputs: ['id', 'disabled', 'value'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'select-item',
    class:
      'group/select-item relative flex w-full cursor-pointer items-center justify-between rounded-lg py-2 ps-3 pe-3 text-sm font-medium text-gray-700 outline-hidden select-none transition-colors hover:bg-gray-100 hover:text-gray-900 data-highlighted:bg-gray-100 data-highlighted:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white dark:data-highlighted:bg-white/5 dark:data-highlighted:text-white dark:aria-selected:bg-white/5 dark:aria-selected:text-white',
  },
  template: `
    <span><ng-content /></span>
    @if (_active()) {
      <svg
        class="size-4 text-brand-500 dark:text-brand-400"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    }
  `,
})
export class SelectItemComponent {
  private readonly _brnSelectItem = inject(BrnSelectItem);
  protected readonly _active = this._brnSelectItem.active;
}

export const SELECT_IMPORTS = [
  SelectRootComponent,
  SelectTriggerComponent,
  SelectValueComponent,
  SelectPortalDirective,
  SelectContentComponent,
  SelectItemComponent,
] as const;
