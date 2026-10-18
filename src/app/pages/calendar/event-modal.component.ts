import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import type { CalendarEvent, EventFormData } from './types';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { InputDirective } from '../../shared/components/ui/input/input.directive';

@Component({
  selector: 'app-event-modal',
  imports: [InputDirective, ButtonComponent, CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-99999 flex items-center justify-center p-4 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          (click)="onClose()"
        ></div>

        <!-- Card Container -->
        <div
          class="relative w-full max-w-175 rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-lg sm:p-11 dark:border-gray-800 dark:bg-[#1E2635] z-10 my-auto"
          (click)="$event.stopPropagation()"
        >
          <!-- Top-end circular close button (Figma large design) -->
          <button app-button variant="unstyled"
            type="button"
            (click)="onClose()"
            class="absolute end-6 top-6 hidden size-11 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 sm:flex dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-6"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </button>

          <!-- Title and subtitle -->
          <div class="flex flex-col gap-2">
            <h3
              class="text-title-lg leading-8 font-semibold text-gray-800 sm:text-2xl dark:text-white/90"
            >
              Add / Edit Event
            </h3>
            <p
              class="text-sm leading-5 font-normal text-gray-500 dark:text-gray-400"
            >
              Plan your next big moment: schedule or edit an event to stay on
              track
            </p>
          </div>

          <!-- Form fields -->
          <form
            (ngSubmit)="handleSubmit($event)"
            class="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
          >
            <!-- Event Title -->
            <div>
              <label
                for="event-title"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Event Title
              </label>
              <input app-input unstyled
                id="event-title"
                type="text"
                [(ngModel)]="eventTitle"
                name="eventTitle"
                class="h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40"
              />
            </div>

            <!-- Event Color -->
            <div>
              <label
                class="mb-3 block text-sm font-medium text-gray-700 sm:mb-4 dark:text-gray-300"
              >
                Event Color
              </label>
              <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                @for (color of eventColors; track color) {
                  <div
                    class="flex items-center gap-2 cursor-pointer"
                    (click)="setEventLevel(color)"
                  >
                    <div
                      class="group/radio-group-item relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-theme-xs outline-hidden transition-colors"
                      [ngClass]="
                        eventLevel === color
                          ? 'border-brand-500 bg-brand-500'
                          : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900'
                      "
                    >
                      @if (eventLevel === color) {
                        <span class="size-2 rounded-full bg-white"></span>
                      }
                    </div>
                    <label
                      class="cursor-pointer text-sm font-normal text-gray-700 dark:text-gray-400"
                    >
                      {{ color }}
                    </label>
                  </div>
                }
              </div>
            </div>

            <!-- Enter Start Date -->
            <div>
              <label
                for="event-start-date"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter Start Date
              </label>
              <input app-input unstyled
                #startDateInput
                id="event-start-date"
                type="text"
                placeholder="dd/mm/yyyy"
                [(ngModel)]="eventStartDate"
                name="eventStartDate"
                class="h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40 cursor-pointer"
              />
            </div>

            <!-- Enter End Date -->
            <div>
              <label
                for="event-end-date"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter End Date
              </label>
              <input app-input unstyled
                #endDateInput
                id="event-end-date"
                type="text"
                placeholder="dd/mm/yyyy"
                [(ngModel)]="eventEndDate"
                name="eventEndDate"
                class="h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40 cursor-pointer"
              />
            </div>

            <!-- Action buttons (Small: 2 columns full-width, Large: right-aligned) -->
            <div
              class="grid grid-cols-2 gap-3 pt-2 sm:flex sm:justify-end sm:pt-4"
            >
              <button app-button variant="unstyled"
                type="button"
                (click)="onClose()"
                class="h-11 w-full rounded-[10px] border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button app-button variant="unstyled"
                type="submit"
                class="h-11 w-full rounded-[10px] bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:w-auto cursor-pointer"
              >
                {{ selectedEvent ? 'Save Changes' : 'Add Event' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class EventModalComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() selectedEvent: CalendarEvent | null = null;
  @Input() initialStartDate = '';
  @Input() initialEndDate = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<EventFormData>();

  private startDateInputEl: HTMLInputElement | null = null;
  private endDateInputEl: HTMLInputElement | null = null;

  @ViewChild('startDateInput') set startDateInput(
    el: ElementRef<HTMLInputElement> | undefined,
  ) {
    if (el && el.nativeElement) {
      this.startDateInputEl = el.nativeElement;
      this.initStartDatePicker();
    } else {
      this.startDateInputEl = null;
      if (this.startPicker) {
        this.startPicker.destroy();
        this.startPicker = null;
      }
    }
  }

  @ViewChild('endDateInput') set endDateInput(
    el: ElementRef<HTMLInputElement> | undefined,
  ) {
    if (el && el.nativeElement) {
      this.endDateInputEl = el.nativeElement;
      this.initEndDatePicker();
    } else {
      this.endDateInputEl = null;
      if (this.endPicker) {
        this.endPicker.destroy();
        this.endPicker = null;
      }
    }
  }

  eventTitle = '';
  eventStartDate = '';
  eventEndDate = '';
  eventLevel = 'Primary';

  eventColors = ['Primary', 'Danger', 'Success', 'Warning', 'Info'] as const;

  private startPicker: flatpickr.Instance | null = null;
  private endPicker: flatpickr.Instance | null = null;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isOpen'] ||
      changes['selectedEvent'] ||
      changes['initialStartDate'] ||
      changes['initialEndDate']
    ) {
      if (this.isOpen) {
        if (this.selectedEvent) {
          this.eventTitle = (this.selectedEvent.title as string) || '';
          const startStr =
            typeof this.selectedEvent.start === 'string'
              ? this.selectedEvent.start.split('T')[0]
              : this.selectedEvent.start instanceof Date
                ? this.selectedEvent.start.toISOString().split('T')[0]
                : '';
          const endStr =
            typeof this.selectedEvent.end === 'string'
              ? this.selectedEvent.end.split('T')[0]
              : this.selectedEvent.end instanceof Date
                ? this.selectedEvent.end.toISOString().split('T')[0]
                : '';
          this.eventStartDate = startStr;
          this.eventEndDate = endStr || startStr;
          this.eventLevel =
            this.selectedEvent.extendedProps?.calendar || 'Primary';
        } else {
          this.eventTitle = '';
          this.eventStartDate = this.initialStartDate || '';
          this.eventEndDate =
            this.initialEndDate || this.initialStartDate || '';
          this.eventLevel = 'Primary';
        }

        if (this.startPicker && this.eventStartDate) {
          this.startPicker.setDate(this.eventStartDate, false);
        }
        if (this.endPicker && this.eventEndDate) {
          this.endPicker.setDate(this.eventEndDate, false);
        }
        this.cdr.markForCheck();
      } else {
        this.destroyPickers();
      }
    }
  }

  setEventLevel(color: string) {
    this.eventLevel = color;
  }

  onClose() {
    this.close.emit();
  }

  handleSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    const titleVal =
      this.eventTitle.trim() || (this.selectedEvent ? 'Event' : 'New Event');
    const startDateVal = this.eventStartDate;
    const endDateVal = this.eventEndDate || startDateVal;
    const levelVal = this.eventLevel || 'Primary';

    this.save.emit({
      title: titleVal,
      start: startDateVal,
      end: endDateVal,
      level: levelVal,
    });
  }

  private initStartDatePicker() {
    if (!this.startDateInputEl) return;
    if (this.startPicker) {
      this.startPicker.destroy();
    }

    const prevArrowSvg =
      '<svg class="stroke-current rtl:rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const nextArrowSvg =
      '<svg class="stroke-current rtl:rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const fp = flatpickr(this.startDateInputEl, {
      dateFormat: 'Y-m-d',
      defaultDate: this.eventStartDate || undefined,
      monthSelectorType: 'static',
      static: true,
      clickOpens: true,
      prevArrow: prevArrowSvg,
      nextArrow: nextArrowSvg,
      onChange: (_dates, dateStr) => {
        this.ngZone.run(() => {
          this.eventStartDate = dateStr;
          this.cdr.markForCheck();
        });
      },
    });
    this.startPicker = Array.isArray(fp) ? fp[0] : fp;
  }

  private initEndDatePicker() {
    if (!this.endDateInputEl) return;
    if (this.endPicker) {
      this.endPicker.destroy();
    }

    const prevArrowSvg =
      '<svg class="stroke-current rtl:rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const nextArrowSvg =
      '<svg class="stroke-current rtl:rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const fp = flatpickr(this.endDateInputEl, {
      dateFormat: 'Y-m-d',
      defaultDate: this.eventEndDate || undefined,
      monthSelectorType: 'static',
      static: true,
      clickOpens: true,
      prevArrow: prevArrowSvg,
      nextArrow: nextArrowSvg,
      onChange: (_dates, dateStr) => {
        this.ngZone.run(() => {
          this.eventEndDate = dateStr;
          this.cdr.markForCheck();
        });
      },
    });
    this.endPicker = Array.isArray(fp) ? fp[0] : fp;
  }

  private destroyPickers() {
    if (this.startPicker) {
      this.startPicker.destroy();
      this.startPicker = null;
    }
    if (this.endPicker) {
      this.endPicker.destroy();
      this.endPicker = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyPickers();
  }
}
