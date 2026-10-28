import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectInfo,
  EventClickInfo,
} from 'fullcalendar';
import dayGridPlugin from 'fullcalendar/daygrid';
import interactionPlugin from 'fullcalendar/interaction';
import multiMonthPlugin from 'fullcalendar/multimonth';
import themePlugin from 'fullcalendar/themes/classic';
import timeGridPlugin from 'fullcalendar/timegrid';
import { Subscription } from 'rxjs';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ThemeService } from '../../core/services/theme.service';
import { renderCalendarEvent } from './event-item';
import { EventModalComponent } from './event-modal.component';
import {
  getBookmarkIcon,
  getChevronLeftIcon,
  getChevronRightIcon,
  getCloseIcon,
} from './icons';
import type { CalendarEvent, EventFormData } from './types';
import { ViewSelectorComponent } from './view-selector.component';

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Event Conf.',
    start: new Date().toISOString().split('T')[0],
    extendedProps: { calendar: 'Danger' },
  },
  {
    id: '2',
    title: 'Meeting',
    start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    extendedProps: { calendar: 'Success' },
  },
  {
    id: '3',
    title: 'Workshop',
    start: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    end: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    extendedProps: { calendar: 'Primary' },
  },
];

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    FullCalendarModule,
    PageBreadcrumbComponent,
    EventModalComponent,
  ],
  templateUrl: './calendar.component.html',
  styles: ``,
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  events: CalendarEvent[] = [...INITIAL_EVENTS];
  selectedEvent: CalendarEvent | null = null;
  selectedStartDate = '';
  selectedEndDate = '';
  currentView = 'dayGridMonth';
  isOpen = false;
  isMobile = false;
  currentTheme = 'light';

  calendarOptions!: CalendarOptions;

  private viewSelectorRef: ComponentRef<ViewSelectorComponent> | null = null;
  private themeSub?: Subscription;

  constructor(
    private elRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private themeService: ThemeService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.checkMobile();

    this.themeSub = this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.cdr.markForCheck();
    });

    this.initCalendarOptions();
  }

  ngOnDestroy() {
    if (this.themeSub) {
      this.themeSub.unsubscribe();
    }
    if (this.viewSelectorRef) {
      this.viewSelectorRef.destroy();
      this.viewSelectorRef = null;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (this.isMobile !== mobile) {
      this.isMobile = mobile;
      if (this.calendarOptions) {
        this.initCalendarOptions();
      }
    }
  }

  handleViewChange(viewKey: string) {
    this.currentView = viewKey;
    const calApi = this.calendarComponent?.getApi();
    if (calApi && typeof calApi.changeView === 'function') {
      calApi.changeView(viewKey);
    }
    if (this.viewSelectorRef) {
      this.viewSelectorRef.instance.currentView = viewKey;
    }
    this.cdr.markForCheck();
  }

  handleOpenAddModal() {
    this.ngZone.run(() => {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const combineDate = `${yyyy}-${mm}-${dd}`;

      this.selectedEvent = null;
      this.selectedStartDate = combineDate;
      this.selectedEndDate = combineDate;
      this.openModal();
    });
  }

  handleDateSelect(selectInfo: DateSelectInfo) {
    this.ngZone.run(() => {
      const startStr = selectInfo.startStr
        ? selectInfo.startStr.split('T')[0]
        : '';
      const endStr = selectInfo.endStr
        ? selectInfo.endStr.split('T')[0]
        : startStr;

      this.selectedEvent = null;
      this.selectedStartDate = startStr;
      this.selectedEndDate = endStr;
      this.openModal();
    });
  }

  handleEventClick(clickInfo: EventClickInfo) {
    this.ngZone.run(() => {
      const event = clickInfo.event as any;
      if (event.url) {
        window.open(event.url);
        clickInfo.jsEvent?.preventDefault();
        return;
      }

      const startStr = event.startStr ? event.startStr.split('T')[0] : '';
      const endStr = event.endStr ? event.endStr.split('T')[0] : startStr;

      this.selectedEvent = {
        id: event.id,
        title: event.title,
        start: event.startStr,
        end: event.endStr,
        extendedProps: { calendar: event.extendedProps?.calendar || 'Primary' },
      };
      this.selectedStartDate = startStr;
      this.selectedEndDate = endStr;
      this.openModal();
    });
  }

  handleSaveEvent(formData: EventFormData) {
    this.ngZone.run(() => {
      const titleVal =
        formData.title.trim() || (this.selectedEvent ? 'Event' : 'New Event');
      const startDateVal = formData.start;
      const endDateVal = formData.end || startDateVal;
      const levelVal = formData.level || 'Primary';

      if (this.selectedEvent) {
        this.events = this.events.map((ev) =>
          String(ev.id) === String(this.selectedEvent!.id)
            ? {
                ...ev,
                title: titleVal,
                start: startDateVal,
                end: endDateVal || startDateVal,
                extendedProps: { calendar: levelVal },
              }
            : ev,
        );
      } else {
        const newEvent: CalendarEvent = {
          id: Date.now().toString(),
          title: titleVal,
          start: startDateVal,
          end: endDateVal || startDateVal,
          allDay: true,
          extendedProps: { calendar: levelVal },
        };
        this.events = [...this.events, newEvent];
      }

      const api = this.calendarComponent?.getApi();
      if (api) {
        api.removeAllEvents();
        this.events.forEach((ev) => api.addEvent(ev));
      }
      this.closeModal();
    });
  }

  openModal() {
    this.ngZone.run(() => {
      this.isOpen = true;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  closeModal() {
    this.ngZone.run(() => {
      this.isOpen = false;
      this.selectedEvent = null;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  private renderViewSelectComponent() {
    requestAnimationFrame(() => {
      const el = this.elRef.nativeElement;
      const chunk = el.querySelector(
        '.ta-toolbar-section:last-child',
      ) as HTMLElement;
      if (!chunk) return;

      if (!this.viewSelectorRef) {
        this.viewSelectorRef =
          this.viewContainerRef.createComponent(ViewSelectorComponent);
        this.viewSelectorRef.instance.currentView = this.currentView;
        this.viewSelectorRef.instance.viewChange.subscribe((viewKey: string) => {
          this.handleViewChange(viewKey);
        });
      } else {
        this.viewSelectorRef.instance.currentView = this.currentView;
      }

      const domNode = this.viewSelectorRef.location.nativeElement;
      if (domNode.parentElement !== chunk) {
        chunk.innerHTML = '';
        chunk.appendChild(domNode);
      }
    });
  }

  initCalendarOptions() {
    const isRtl =
      typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
    const locale =
      (typeof document !== 'undefined' && document.documentElement.lang) ||
      'en';

    this.calendarOptions = {
      plugins: [
        themePlugin,
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        multiMonthPlugin,
      ],
      initialView: this.currentView || 'dayGridMonth',
      direction: isRtl ? 'rtl' : 'ltr',

      // Toolbar Header configuration
      headerToolbar: {
        start: 'prev,next addEventButton',
        center: 'title',
        end: '',
      },
      headerToolbarClass:
        'sticky top-0! z-20! bg-white dark:bg-gray-900 flex-wrap! flex-row! items-center justify-between gap-3 sm:gap-4 [padding-inline:16px]! sm:[padding-inline:24px]! pt-4 sm:pt-6 pb-3 sm:pb-4',
      toolbarTitleClass:
        'text-base! sm:text-lg! font-semibold! text-gray-800 dark:text-white/90',
      toolbarSectionClass: (info: any) => {
        if (info.name === 'start') {
          return 'ta-toolbar-section ta-toolbar-start order-2 flex w-full items-center justify-between sm:order-1 sm:w-auto sm:justify-start gap-2';
        }
        if (info.name === 'center') {
          return 'ta-toolbar-section ta-toolbar-center order-1 flex items-center justify-start sm:order-2 sm:justify-center';
        }
        if (info.name === 'end') {
          return 'ta-toolbar-section ta-toolbar-end order-1 flex items-center justify-end sm:order-3 sm:justify-end';
        }
        return 'ta-toolbar-section';
      },
      buttonGroupClass: 'gap-2',

      buttons: {
        prev: {
          iconContent: {
            html: getChevronLeftIcon(),
          },
          className:
            'flex size-9! sm:size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!',
        },
        next: {
          iconContent: {
            html: getChevronRightIcon(),
          },
          className:
            'flex size-9! sm:size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!',
        },
        addEventButton: {
          text: 'Add Event +',
          click: () => {
            this.handleOpenAddModal();
          },
          className:
            'rounded-lg! border-0! bg-brand-500! px-3! sm:px-4! py-2! sm:py-2.5! text-xs! sm:text-sm! font-medium! text-white hover:bg-brand-600! focus:shadow-none! w-auto!',
        },
      },

      // View configurations
      views: {
        multiMonthYear: {
          multiMonthMaxColumns: 3,
          singleMonthClass: 'fc-multimonth',
          tableClass:
            'overflow-visible! border-0! sm:border! sm:border-gray-200! dark:sm:border-gray-800! rounded-none! sm:rounded-lg! mt-0! bg-transparent!',
          singleMonthHeaderClass:
            'mb-0! bg-white dark:bg-gray-900 sm:bg-transparent! ',
          tableHeaderClass:
            'mb-0! rounded-none! sm:rounded-t-lg! bg-gray-50 dark:bg-gray-900!',
          tableBodyClass: 'mt-0!',
          singleMonthMinWidth: 280,
          showNonCurrentDates: true,
          singleMonthHeaderInnerClass:
            'text-sm font-medium! text-gray-800 dark:text-white/90',
          dayHeaderRowClass: 'fc-multimonth-day-header-row',
          dayHeaderClass: (data: any) =>
            data.inPopover
              ? 'relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!'
              : 'border-0! bg-gray-50 py-2! dark:bg-gray-900 dark:sm:bg-transparent! first:rounded-none! first:sm:rounded-ss-lg! last:rounded-none! last:sm:rounded-se-lg!',
          dayHeaderInnerClass: (data: any) =>
            data.inPopover
              ? 'text-sm! font-semibold! text-gray-800! dark:text-white/90!'
              : 'py-1 text-[11px] sm:text-xs font-medium text-gray-400 uppercase',
          dayCellClass: (data: any) => {
            if (data.inPopover) return 'bg-transparent! p-3!';
            let cls = 'relative! p-0.5 sm:p-1!';
            if (data.isToday)
              cls +=
                ' isolate rounded-sm! bg-gray-100! dark:bg-gray-800/40! font-semibold text-brand-500 dark:text-brand-400';
            if (data.isOther) cls += ' bg-transparent!';
            return cls;
          },
          dayCellInnerClass: (data: any) =>
            data.inPopover
              ? 'flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto'
              : 'h-0 max-h-0 overflow-hidden invisible',
          dayCellTopInnerClass:
            'text-xs! sm:text-sm! text-gray-700 dark:text-gray-300',
          dayMaxEvents: 0,
          moreLinkClass:
            'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
          rowMoreLinkClass:
            'absolute! -top-0.5! sm:-top-1! start-0.5! z-10! border-0! bg-transparent! p-0!',
          rowMoreLinkInnerClass: 'overflow-visible!',
          moreLinkContent() {
            return {
              html: `<span>${getBookmarkIcon()}</span>`,
            };
          },
        },
        dayGridMonth: {
          dayMaxEvents: this.isMobile ? 0 : 2,
          dayHeaderAlign: (data: any) =>
            data.inPopover ? 'start' : 'center',
          dayHeaderClass: (data: any) =>
            data.inPopover
              ? 'relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!'
              : 'border-x-0! border-t border-gray-200! bg-gray-50 dark:border-gray-800! dark:bg-gray-900',
          dayHeaderInnerClass: (data: any) =>
            data.inPopover
              ? 'text-sm! font-semibold! text-gray-800! dark:text-white/90!'
              : 'px-1! py-2! sm:px-3! sm:py-3! md:px-5! md:py-4! text-xs! sm:text-sm! font-medium! text-gray-400 uppercase',
          dayCellClass: (data: any) => {
            if (data.inPopover) return 'bg-transparent! p-3!';
            return `bg-transparent! p-1! sm:p-2! ${
              data.isToday ? 'bg-gray-100! dark:bg-gray-800/40!' : ''
            }`;
          },
          dayCellTopInnerClass:
            'text-xs! sm:text-sm! text-gray-700 dark:text-gray-300',
          dayCellInnerClass: (data: any) => {
            if (data.inPopover)
              return 'flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto';
            if (this.isMobile)
              return 'h-0 max-h-0 overflow-hidden invisible';
            return data.isToday ? 'rounded-sm!' : '';
          },
          rowMoreLinkClass: this.isMobile
            ? 'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!'
            : '',
          rowMoreLinkInnerClass: this.isMobile ? 'overflow-visible!' : '',
          moreLinkClass:
            'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
          moreLinkContent: (args: any) => {
            if (this.isMobile) {
              return {
                html: `<span>${getBookmarkIcon()}</span>`,
              };
            }
            return {
              html: `<span class="fc-more-link-badge inline-flex items-center rounded-sm bg-brand-50 px-1 py-0.5 text-[10px] font-medium text-brand-600 transition-colors hover:bg-brand-100 sm:px-1.5 sm:text-xs dark:bg-brand-500/15 dark:text-brand-400 dark:hover:bg-brand-500/25">+${args.num} more</span>`,
            };
          },
        },
        timeGridWeek: {
          slotDuration: '01:00:00',
          slotMinHeight: 56,
          allDaySlot: true,
          dayMaxEvents: this.isMobile ? 0 : undefined,
          moreLinkClass:
            'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
          rowMoreLinkClass: this.isMobile
            ? 'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!'
            : '',
          rowMoreLinkInnerClass: this.isMobile ? 'overflow-visible!' : '',
          moreLinkContent: this.isMobile
            ? () => ({
                html: `<span>${getBookmarkIcon()}</span>`,
              })
            : undefined,
          dayHeaderContent: (arg: any) => {
            const weekday = new Intl.DateTimeFormat(locale, {
              weekday: 'short',
            })
              .format(arg.date)
              .toUpperCase();
            const day = new Intl.DateTimeFormat(locale, {
              day: 'numeric',
            }).format(arg.date);
            return `${weekday} - ${day}`;
          },
          dayHeaderClass: (data: any) =>
            `border-0! bg-gray-50! dark:bg-gray-900! ${
              data.isToday ? 'bg-gray-100/70! dark:bg-gray-800/60!' : ''
            }`,
          dayHeaderInnerClass: (data: any) =>
            `px-1.5! sm:px-3! py-2.5! sm:py-3.5! text-center! text-[11px]! sm:text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
              data.isToday
                ? 'font-semibold! text-brand-500! dark:text-brand-400!'
                : ''
            }`,
          slotHeaderDividerClass:
            'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
          slotHeaderClass:
            'px-1.5! sm:px-3! py-1.5! sm:py-2! text-start! text-[11px]! sm:text-xs! font-medium! text-gray-400! dark:text-gray-500!',
          slotLaneClass: 'border-gray-100! dark:border-gray-800/60!',
          dayLaneClass: (data: any) =>
            `border-gray-200! dark:border-gray-800! ${
              data.isToday
                ? 'bg-brand-50/15! dark:bg-brand-500/[0.03]!'
                : ''
            }`,
          allDayDividerClass:
            'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
          allDayHeaderClass:
            'border-0! bg-gray-50! text-[11px]! sm:text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!',
        },
        timeGridDay: {
          slotDuration: '00:30:00',
          slotMinHeight: 48,
          allDaySlot: true,
          dayMaxEvents: this.isMobile ? 0 : undefined,
          moreLinkClass:
            'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
          rowMoreLinkClass: this.isMobile
            ? 'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!'
            : '',
          rowMoreLinkInnerClass: this.isMobile ? 'overflow-visible!' : '',
          moreLinkContent: this.isMobile
            ? () => ({
                html: `<span>${getBookmarkIcon()}</span>`,
              })
            : undefined,
          dayHeaderContent: (arg: any) => {
            const weekday = new Intl.DateTimeFormat(locale, {
              weekday: 'short',
            })
              .format(arg.date)
              .toUpperCase();
            const day = new Intl.DateTimeFormat(locale, {
              day: 'numeric',
            }).format(arg.date);
            return `${weekday} - ${day}`;
          },
          dayHeaderClass: (data: any) =>
            `border-0! bg-gray-50! dark:bg-gray-900! ${
              data.isToday ? 'bg-gray-100/70! dark:bg-gray-800/60!' : ''
            }`,
          dayHeaderInnerClass: (data: any) =>
            `px-2! sm:px-4! py-2.5! sm:py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
              data.isToday
                ? 'font-semibold! text-brand-500! dark:text-brand-400!'
                : ''
            }`,
          slotHeaderDividerClass:
            'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
          slotHeaderClass:
            'px-2! sm:px-3! py-1.5! sm:py-2! text-start! text-[11px]! sm:text-xs! font-medium! text-gray-400! dark:text-gray-500!',
          slotLaneClass: 'border-gray-100! dark:border-gray-800/60!',
          dayLaneClass: (data: any) =>
            `border-gray-200! dark:border-gray-800! ${
              data.isToday
                ? 'bg-brand-50/15! dark:bg-brand-500/[0.03]!'
                : ''
            }`,
          allDayDividerClass:
            'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
          allDayHeaderClass:
            'border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!',
        },
      },

      // Body configuration
      height: 'auto',
      borderless: true,
      viewClass:
        'border-t! border-b-0! border-x-0! border-gray-200! bg-transparent! dark:border-gray-800! dark:bg-transparent!',
      tableHeaderClass: 'border-0! bg-gray-50! dark:bg-gray-900!',
      dayHeaderDividerClass:
        'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
      slotMinHeight: 56,
      slotHeaderDividerClass:
        'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
      allDayDividerClass:
        'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
      eventClass: 'focus:shadow-none',
      nowIndicator: false,
      columnEventClass:
        'bg-transparent! border-0! p-1! shadow-none! hover:shadow-none! focus:outline-none',
      columnEventInnerClass: 'p-0! border-0! bg-transparent! h-full',
      tableHeaderSticky: true,
      tableClass: 'overflow-hidden bg-transparent!',
      rowEventClass:
        'bg-transparent! border-0! px-1! py-0.5! shadow-none! hover:shadow-none! focus:outline-none',
      rowEventInnerClass: 'p-0! border-0! bg-transparent!',
      popoverFormat: { month: 'short', day: 'numeric', year: 'numeric' },
      popoverClass:
        'z-99999! w-72 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900',
      popoverCloseClass:
        'absolute end-3 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
      popoverCloseContent: {
        html: getCloseIcon('size-4'),
      },

      selectable: true,
      events: this.events,
      select: (info) => this.handleDateSelect(info),
      eventClick: (info) => this.handleEventClick(info),
      eventContent: (arg) => renderCalendarEvent(arg),
      datesSet: (arg: any) => {
        this.currentView = arg.view.type;
        this.renderViewSelectComponent();
      },
    };
  }
}
