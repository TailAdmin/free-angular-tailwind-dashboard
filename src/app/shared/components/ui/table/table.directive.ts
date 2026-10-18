import { Directive } from '@angular/core';

/** Mirrors the Next.js `Table` (`<table class="min-w-full ...">`). */
@Directive({
  selector: 'table[app-table]',
  host: { 'data-slot': 'table', class: 'min-w-full' },
})
export class TableDirective {}

/** Mirrors the Next.js `TableHeader` (`<thead>`). */
@Directive({
  selector: 'thead[app-table-header]',
  host: { 'data-slot': 'table-header' },
})
export class TableHeaderDirective {}

/** Mirrors the Next.js `TableBody` (`<tbody>`). */
@Directive({
  selector: 'tbody[app-table-body]',
  host: { 'data-slot': 'table-body' },
})
export class TableBodyDirective {}

/** Mirrors the Next.js `TableRow` (`<tr>`). */
@Directive({
  selector: 'tr[app-table-row]',
  host: { 'data-slot': 'table-row' },
})
export class TableRowDirective {}

/** Mirrors the Next.js `TableCell` (`<th>` when `isHeader`, otherwise `<td>`). */
@Directive({
  selector: 'th[app-table-cell], td[app-table-cell]',
  host: { 'data-slot': 'table-cell' },
})
export class TableCellDirective {}

export const TABLE_IMPORTS = [
  TableDirective,
  TableHeaderDirective,
  TableBodyDirective,
  TableRowDirective,
  TableCellDirective,
] as const;
