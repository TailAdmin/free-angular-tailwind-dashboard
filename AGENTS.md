# AGENTS.md — TailAdmin Free Angular

> Free Angular 22 administrative dashboard template · Standalone Components · Tailwind CSS v4 · ApexCharts · FullCalendar · Flatpickr · Swiper · RTL Layout Support

## Repo Map

```
src/
├── app/
│   ├── pages/                    # Route page components categorized by feature/domain
│   │   ├── auth-pages/           # Sign in, Sign up
│   │   ├── blank/                # Blank starter page
│   │   ├── calender/             # FullCalendar interactive schedule view
│   │   ├── charts/               # Chart preview pages (line, bar)
│   │   ├── dashboard/            # Dashboard variant (ecommerce)
│   │   ├── forms/                # Form elements and layouts
│   │   ├── invoices/             # Invoice management preview
│   │   ├── other-page/           # Error pages (404)
│   │   ├── profile/              # User profile and settings
│   │   ├── tables/               # Basic tables preview
│   │   └── ui-elements/          # UI primitives showcase (alerts, badges, buttons, modals, etc.)
│   ├── shared/
│   │   ├── components/           # Reusable standalone UI and domain components
│   │   │   ├── auth/             # Authentication forms (signin, signup)
│   │   │   ├── cards/            # Metric and summary cards
│   │   │   ├── charts/           # ApexChart subcomponents (bar, line)
│   │   │   ├── common/           # Shared wrappers (component-card, page-breadcrumb, table-dropdown)
│   │   │   ├── ecommerce/        # Dashboard widgets (metrics, monthly target, sales chart, recent orders)
│   │   │   ├── form/             # Form controls (input, select, date-picker, time-picker)
│   │   │   ├── header/           # Header widgets (user-dropdown, notification-dropdown)
│   │   │   ├── invoice/          # Invoice widgets (invoice-list)
│   │   │   ├── tables/           # Table variations (basic-table-one, basic-table-two, etc.)
│   │   │   ├── ui/               # Core UI primitives (alert, avatar, badge, button, modal, dropdown, tabs)
│   │   │   └── user-profile/     # Profile widgets (user-meta-card, user-address-card)
│   │   ├── layout/               # Master layouts & navigation shells (app-layout, app-header, app-sidebar, backdrop)
│   │   └── services/             # Core singleton services (theme.service, sidebar.service, modal.service)
│   ├── app.component.ts          # Root component (handles RTL persistence and initialization)
│   ├── app.config.ts             # Application configuration & providers (router, change detection)
│   └── app.routes.ts             # Application routing definitions
├── styles.css                    # Tailwind CSS v4 theme (@theme), global utility classes & 3rd party overrides
├── main.ts                       # Angular bootstrap entry point
└── index.html                    # Root HTML document
```

## Stack

- **Angular 22** (`@angular/core`, `@angular/common`, `@angular/router`, `@angular/forms`, `@angular/cdk`).
- **Standalone Component Architecture**: All components, directives, and pipes are standalone without `NgModule`.
- **Modern Angular Control Flow**: Built-in template control flow syntax (`@if`, `@else if`, `@else`, `@for (item of items; track item.id)`, `@switch`, `@case`, `@default`).
- **Tailwind CSS v4**: Configured with `@tailwindcss/postcss` and `@theme` tokens in `src/styles.css`. No `tailwind.config.js`.
- **TypeScript ~6.0**: Strict type safety throughout components, models, and services.
- **State Management & Services**:
  - `ThemeService`: Reactive RxJS `BehaviorSubject` for `light`/`dark` theme management synced with `localStorage`, `document.documentElement` (`.dark` class, `data-theme`, `color-scheme`).
  - `SidebarService`: Manages sidebar expand/collapse, mobile drawer visibility, and hover state (`isExpanded$`, `isMobileOpen$`, `isHovered$`).
  - `ModalService`: Synchronous & observable state handler for reusable modal dialogs.
- **RTL & Localization Rules**:
  - The Free version uses **English text strings directly** across all components — do **NOT** install or use multi-language packages (`TranslatePipe`, `translate`, `i18n.json`).
  - RTL mode is driven by setting `dir="rtl"` on `<html>` and saving to `localStorage.setItem('dir', 'rtl')`, toggled via the language menu in `UserDropdownComponent` and restored on startup in `AppComponent`.
  - All components must provide full RTL layout support using CSS logical properties.
- **Third-Party Libraries**:
  - **ApexCharts & ng-apexcharts**: Interactive charts and data visualizations.
  - **FullCalendar** (`@fullcalendar/angular`): Event calendar with DayGrid, TimeGrid, and Interaction plugins.
  - **Flatpickr**: Advanced date and time pickers.
  - **Swiper**: Touch sliders and carousels.
  - **Prism.js**: Code snippet syntax highlighting.
- **Scripts**:
  - `npm start` / `ng serve` — starts the development server on `http://localhost:4200/`.
  - `npm run build` / `ng build` — compiles the production bundle into `dist/`.
  - `npm run watch` — builds in development mode with active file watcher.
  - `npm test` / `ng test` — executes unit tests via Karma and Jasmine.

## Conventions

- **New Page**:
  - Add the route to `src/app/app.routes.ts` under the appropriate layout parent (`AppLayoutComponent` for admin dashboard, or top-level for auth/errors).
  - Provide a clear, descriptive `title` property in the route definition.
  - Create the page component in `src/app/pages/<category>/<page-name>/<page-name>.component.ts` (with `.html` and optional `.css`).
  - Wrap standard dashboard pages with `<app-page-breadcrumb [pageTitle]="'...'"></app-page-breadcrumb>` and wrap card sections in `<app-component-card [title]="'...'"></app-component-card>`.
- **New Reusable Component**:
  - UI primitives: `src/app/shared/components/ui/<component-name>/`.
  - Form controls: `src/app/shared/components/form/<component-name>/`.
  - Shared wrappers: `src/app/shared/components/common/<component-name>/`.
  - Domain-specific components: `src/app/shared/components/<feature>/<component-name>/`.
  - Always declare `@Component({ standalone: true, imports: [...] })` and explicitly import all required modules/components (e.g. `CommonModule`, `RouterModule`, `FormsModule`).
- **Inputs & Outputs**:
  - Use `@Input()` with explicit TypeScript types and sensible default values.
  - Use `@Output() eventName = new EventEmitter<T>()` for emitting component actions.
- **Template Syntax**:
  - Always use modern Angular control flow blocks: `@if`, `@else if`, `@else`, `@for (item of list; track item.id)`, `@switch`.
  - Avoid legacy `*ngIf`, `*ngFor`, `*ngSwitch` directives.
- **Icons & Visual Assets**:
  - Inline SVG icons inside components using `w-*` / `h-*` sizing tokens and `fill-current` / `stroke-current` for adaptive theming.
  - Ensure icons scale appropriately and inherit text color states (`text-gray-500`, `text-brand-500`, etc.).

## Layouts & Structure

- **App Layout (`AppLayoutComponent`)**: Standard admin shell containing `AppSidebarComponent`, `AppHeaderComponent`, `BackdropComponent`, and `<router-outlet>`. Handles dynamic sidebar margin offsets based on `SidebarService`.
- **Auth & Error Pages**: Standalone full-width page components rendered directly at root router level (no sidebar/header wrapper).

## Styling Rules & Dark Mode

- **Tailwind CSS v4**: Defined via `src/styles.css` using `@theme` tokens. There is **no** `tailwind.config.js`.
- **Theme Tokens**: Always use predefined theme tokens:
  - **Colors**: `brand` (`25`–`950`), `gray` (`25`–`950`, `gray-dark`), `blue-light` (`25`–`950`), `orange` (`25`–`950`), `success`, `error`, `warning`.
  - **Typography**: `font-outfit`, `text-theme-xs/sm/xl`, `text-title-sm/md/lg/xl/2xl`.
  - **Shadows**: `shadow-theme-xs/sm/md/lg/xl`, `shadow-focus-ring`, `shadow-datepicker`, `shadow-tooltip`.
  - **Breakpoints**: `2xsm` (375px), `xsm` (425px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (2000px).
- **Dark Mode**:
  - Dark mode is class-driven (`.dark` on `<html>` / `document.documentElement`).
  - Every styled element must include corresponding `dark:` variants (e.g. `bg-white dark:bg-gray-800 text-gray-800 dark:text-white/90 border-gray-200 dark:border-gray-800`).
- **Reusable Utility Classes**:
  - Utilize helper classes from `src/styles.css` (`custom-scrollbar`, `no-scrollbar`, chart overrides, calendar custom styling).
  - Never hardcode arbitrary hex colors in component templates when theme tokens exist.

## RTL & Logical Spacing Rules

- **CSS Logical Properties**:
  - Never use physical directional utilities when logical equivalents exist:
    - **Margins & Paddings**: Use `ms-*` / `me-*`, `ps-*` / `pe-*` (or `ltr:mr-* rtl:ml-*`).
    - **Positioning / Insets**: Use `start-*` / `end-*` (or `ltr:left-* rtl:right-*`).
    - **Borders**: Use `border-s-*` / `border-e-*` (or `ltr:border-r rtl:border-l`).
    - **Border Radius**: Use `rounded-s-*` / `rounded-e-*` (or `ltr:rounded-l-* rtl:rounded-r-*`).
    - **Text Alignment**: Use `text-start` / `text-end` instead of `text-left` / `text-right`.
- **Directional Glyphs & Transforms**:
  - Flip directional arrows, breadcrumb chevrons, and pagination icons in RTL using `rtl:rotate-180` or `rtl:-scale-x-100`.
  - Do NOT rotate calendar month navigation icons (Flatpickr next/prev) as they point along the chronological timeline.

## Don'ts

- Don't install new NPM dependencies or packages without asking the user.
- Don't add multi-language translation libraries or `TranslatePipe` to the free version — keep text strings in English directly.
- Don't create `tailwind.config.js` — Tailwind CSS v4 configuration belongs in `src/styles.css`.
- Don't edit files in other projects (`tailadmin-html-pro`, `tailadmin-laravel-pro`, `tailadmin-angular-pro`) unless explicitly instructed.
- Don't use legacy Angular syntax (`*ngIf`, `*ngFor`, `*ngSwitch`) — use modern `@if`, `@for`, `@switch` control flow.
- Don't hardcode physical directional utilities (`ml-*`, `mr-*`, `left-*`, `right-*`, `pl-*`, `pr-*`, `text-left`, `text-right`) without providing RTL compatibility (`ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, etc.).
- Don't write inline CSS `style="..."` attributes when Tailwind CSS tokens and utility classes are available.
- Don't forget `track` expression when using `@for` loops in templates (e.g. `@for (item of items; track item.id)`).
