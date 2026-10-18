export function getChevronLeftIcon(cls = 'size-5 sm:size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${cls}"><path d="M15 18l-6-6 6-6" /></svg>`;
}

export function getChevronRightIcon(cls = 'size-5 sm:size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${cls}"><path d="M9 18l6-6-6-6" /></svg>`;
}

export function getPlusIcon(cls = 'size-4'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}"><path d="M5 12h14M12 5v14" /></svg>`;
}

export function getBookmarkIcon(cls = 'size-4.5 sm:size-5.5 text-brand-500'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}"><path d="M19 3v17a1 1 0 01-1.496.868l-4.512-2.578a2 2 0 00-1.984 0l-4.512 2.578A1 1 0 015 20V3z" /></svg>`;
}

export function getCloseIcon(cls = 'size-6'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}"><path d="M18 6L6 18M6 6l12 12" /></svg>`;
}
