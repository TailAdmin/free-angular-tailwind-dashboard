function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderCalendarEvent(eventInfo: any): { html: string } {
  const calendarLevel = (
    eventInfo.event.extendedProps?.calendar || 'primary'
  ).toLowerCase();

  // Color mappings
  const colorMap: Record<
    string,
    { bg: string; dot: string; title: string; time: string }
  > = {
    success: {
      bg: 'border border-green-100 bg-green-50 dark:border-green-500/20 dark:bg-green-500/15',
      dot: 'bg-green-500',
      title: 'text-green-700 dark:text-green-400',
      time: 'text-green-600/80 dark:text-green-400/80',
    },
    danger: {
      bg: 'border border-error-100 bg-error-50 dark:border-error-500/20 dark:bg-error-500/15',
      dot: 'bg-error-500',
      title: 'text-error-700 dark:text-error-400',
      time: 'text-error-600/80 dark:text-error-400/80',
    },
    primary: {
      bg: 'border border-brand-100 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-500/15',
      dot: 'bg-brand-500',
      title: 'text-brand-700 dark:text-brand-400',
      time: 'text-brand-600/80 dark:text-brand-400/80',
    },
    warning: {
      bg: 'border border-orange-100 bg-orange-50 dark:border-orange-500/20 dark:bg-orange-500/15',
      dot: 'bg-orange-500',
      title: 'text-orange-700 dark:text-orange-400',
      time: 'text-orange-600/80 dark:text-orange-400/80',
    },
    info: {
      bg: 'border border-blue-100 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/15',
      dot: 'bg-blue-500',
      title: 'text-blue-700 dark:text-blue-400',
      time: 'text-blue-600/80 dark:text-blue-400/80',
    },
  };

  const colors = colorMap[calendarLevel] ?? colorMap['primary'];
  const isTimeGridView =
    !eventInfo.event?.allDay &&
    eventInfo.view?.type &&
    eventInfo.view.type.startsWith('timeGrid');

  const title = escapeHtml(eventInfo.event.title || '');
  const timeText = eventInfo.timeText ? escapeHtml(eventInfo.timeText) : '';

  if (isTimeGridView) {
    return {
      html: `
        <div
          dir="ltr"
          class="event-fc-color flex h-full w-full flex-col justify-start overflow-hidden rounded-md p-1 transition-colors sm:rounded-lg sm:p-1.5 ${colors.bg}"
        >
          <div class="flex items-center gap-1 sm:gap-1.5">
            <div class="size-1.5 shrink-0 rounded-full sm:size-2 ${colors.dot}"></div>
            <div class="truncate text-[11px] font-semibold leading-tight sm:text-xs ${colors.title}">${title}</div>
          </div>
          ${
            timeText
              ? `<div class="mt-0.5 truncate ps-2.5 text-[10px] font-medium leading-tight sm:ps-3.5 sm:text-[11px] ${colors.time}">${timeText}</div>`
              : ''
          }
        </div>
      `,
    };
  }

  return {
    html: `
      <div
        dir="ltr"
        class="event-fc-color flex items-center rounded-md py-1 ps-1.5 pe-2 transition-colors sm:rounded-lg sm:py-1.5 sm:ps-2.5 sm:pe-3 ${colors.bg}"
      >
        <div class="fc-daygrid-event-dot ms-0 me-1 h-2.5 w-1 shrink-0 rounded-full border-none sm:me-2 sm:h-3.5 ${colors.dot}"></div>
        ${
          timeText
            ? `<div class="fc-event-time me-1 p-0 text-[10px] font-normal text-gray-500 sm:me-1.5 sm:text-xs dark:text-gray-400">${timeText}</div>`
            : ''
        }
        <div class="fc-event-title truncate p-0 text-[11px] font-medium text-gray-700 sm:text-xs dark:text-white">${title}</div>
      </div>
    `,
  };
}
