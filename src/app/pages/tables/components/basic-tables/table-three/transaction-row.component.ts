import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from './types';
import { TABLE_IMPORTS } from '../../../ui/table';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: '[app-table-three-transaction-row]',
  imports: [ButtonComponent, ...TABLE_IMPORTS, CommonModule],
  template: `
    <td app-table-cell class="min-w-44 py-3 ps-5 text-start sm:ps-6">
      <div class="flex items-center gap-3">
        <div
          class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
          [ngClass]="getBrandBgClass(transaction.brand)"
        >
          @switch (transaction.brand) {
            @case ('paypal') {
              <svg class="size-4" width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M18.427 6.976c.27-1.758 0-2.93-.944-4.013-1.034-1.217-2.922-1.713-5.35-1.713H5.166c-.495 0-.9.36-.99.857L1.256 20.594a.593.593 0 00.584.676h4.316l-.315 1.894c-.045.316.18.586.54.586h3.64c.45 0 .81-.316.855-.721l.764-4.78c.045-.406.45-.721.854-.721h.54c3.506 0 6.293-1.443 7.102-5.592.314-1.713.18-3.201-.72-4.193-.27-.316-.584-.541-.988-.767z" fill="#fff"/>
                <path d="M18.427 6.976c.27-1.758 0-2.93-.944-4.013-1.034-1.217-2.922-1.713-5.35-1.713H5.166c-.495 0-.9.36-.99.857L1.256 20.594a.593.593 0 00.584.676h4.316l1.034-6.673c.09-.496.494-.857.989-.857h2.067c4.046 0 7.193-1.623 8.092-6.403.045-.09.045-.225.09-.36z" fill="#fff"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.62 7.346c0 .009-.004.025-.009.05a1.766 1.766 0 01-.067.278c-.507 2.585-1.651 4.463-3.347 5.674-1.69 1.208-3.777 1.642-5.952 1.642H8.392l-1.166 7.53H1.839c-1.143 0-1.959-1.006-1.825-2.08l.003-.021L2.944 1.898l.003-.014C3.136.84 4.019 0 5.166 0h6.967c2.503 0 4.886.493 6.297 2.148.586.674.994 1.415 1.197 2.283.2.854.185 1.758.035 2.735l-.016.104-.025.076zm-2.137-4.383c-1.034-1.217-2.922-1.713-5.35-1.713H5.166c-.495 0-.9.36-.99.857L1.256 20.594a.593.593 0 00.584.676h4.316l1.033-6.673c.09-.496.495-.857.99-.857h2.067c4.046 0 7.193-1.623 8.092-6.403a.687.687 0 00.047-.179c.01-.057.022-.12.043-.182.27-1.758 0-2.93-.944-4.013z" fill="#1B4BF1"/>
                <path d="M8.402 7.022c.045-.316.45-.722.854-.722h5.485c.629 0 1.258.045 1.798.135.494.09 1.393.316 1.843.587.27-1.759 0-2.931-.944-4.013-.99-1.263-2.877-1.759-5.305-1.759H5.166c-.495 0-.9.36-.99.857L1.256 20.594a.593.593 0 00.584.676h4.316L8.402 7.022z" fill="#fff"/>
              </svg>
            }
            @case ('apple') {
              <svg class="size-4 text-white dark:text-black" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.953 6.822c-.096.055-2.37 1.231-2.37 3.838.108 2.973 2.87 4.015 2.917 4.015-.047.056-.417 1.42-1.512 2.85C15.12 18.759 14.155 20 12.691 20c-1.393 0-1.893-.821-3.5-.821-1.726 0-2.214.821-3.536.821-1.464 0-2.5-1.309-3.416-2.53C1.05 15.874.037 13.367.002 10.96-.023 9.683.24 8.43.906 7.364c.94-1.487 2.619-2.496 4.452-2.53 1.404-.043 2.654.9 3.512.9.821 0 2.357-.9 4.094-.9.75.001 2.75.212 3.989 1.987zM8.75 4.582c-.25-1.166.44-2.33 1.083-3.074C10.655.61 11.953 0 13.07 0c.072 1.165-.38 2.307-1.19 3.14-.726.898-1.976 1.574-3.13 1.441z" fill="currentColor"/>
              </svg>
            }
            @case ('netflix') {
              <svg class="size-4" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.515 0H4.07v18c1.13-.268 2.31-.402 3.445-.452V0z" fill="#C20000"/>
                <path d="M13.93 18V0h-3.445v17.584c2.011.128 3.445.416 3.445.416z" fill="#C20000"/>
                <path d="M4.07 0l9.86 18h-3.445L4.07 6.452V0z" fill="#E50914"/>
              </svg>
            }
            @case ('tesla') {
              <svg class="size-4 text-white" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.522 20.952l2.944-16.556c2.806 0 3.69.308 3.819 1.564 0 0 1.882-.702 2.831-2.127-3.704-1.717-7.427-1.794-7.427-1.794l-2.172 2.645h.005L8.35 2.038S4.628 2.116.923 3.832C1.872 5.258 3.755 5.96 3.755 5.96c.128-1.256 1.012-1.564 3.8-1.566l2.967 16.558z" fill="currentColor"/>
                <path d="M10.521 1.275c2.995-.023 6.422.463 9.932 1.992.469-.844.59-1.217.59-1.217A28.803 28.803 0 0010.52 0 28.798 28.798 0 000 2.05s.171.46.59 1.217c3.508-1.53 6.936-2.015 9.93-1.992h.001z" fill="currentColor"/>
              </svg>
            }
            @case ('amazon') {
              <svg class="size-4.5 text-white" width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.666 10.802c0-1.012.25-1.877.748-2.596.499-.719 1.18-1.261 2.046-1.628.792-.337 1.767-.579 2.926-.726a76.973 76.973 0 011.936-.176v-.374c0-.939-.102-1.57-.308-1.892-.308-.44-.792-.66-1.452-.66h-.176a2.408 2.408 0 00-1.254.462c-.352.264-.58.63-.682 1.1-.059.293-.205.462-.44.506L7.48 4.51c-.25-.059-.374-.19-.374-.396 0-.044.007-.095.022-.154.25-1.305.861-2.273 1.837-2.904C9.94.426 11.08.073 12.386 0h.55c1.672 0 2.977.433 3.916 1.298.147.147.284.305.407.473.125.168.224.319.297.45.073.133.14.324.198.573.059.25.103.422.132.517.03.095.052.3.066.616.015.315.022.502.022.56v5.325c0 .381.055.73.165 1.045.11.315.217.543.319.682.102.14.271.363.506.67.088.133.132.25.132.353 0 .117-.059.22-.176.308a1156.917 1156.917 0 01-1.98 1.716c-.176.132-.389.147-.638.044a7.579 7.579 0 01-.54-.506 18.803 18.803 0 01-.33-.352 4.87 4.87 0 01-.318-.429 9.073 9.073 0 00-.308-.429c-.821.895-1.628 1.452-2.42 1.672-.499.147-1.115.22-1.848.22-1.13 0-2.057-.348-2.783-1.045s-1.089-1.683-1.089-2.959zm3.784-.44c0 .572.143 1.03.429 1.375.286.345.67.517 1.155.517.044 0 .106-.007.187-.022.08-.015.136-.022.165-.022.616-.161 1.093-.557 1.43-1.188.161-.279.282-.583.363-.913.08-.33.125-.598.132-.803.007-.205.011-.543.011-1.012v-.55c-.85 0-1.496.059-1.936.176-1.29.367-1.936 1.18-1.936 2.442z" fill="#fff"/>
                <path d="M19.69 17.446a.69.69 0 01.132-.176 3.45 3.45 0 011.056-.506 7.185 7.185 0 011.628-.242c.147-.015.286-.007.418.022.66.058 1.056.169 1.188.33.059.088.088.22.088.396v.154c0 .513-.14 1.118-.418 1.815-.279.697-.667 1.258-1.166 1.683-.073.059-.14.088-.198.088a.195.195 0 01-.088-.022c-.088-.044-.11-.125-.066-.242.543-1.276.814-2.163.814-2.662 0-.161-.03-.279-.088-.352-.147-.176-.557-.264-1.232-.264-.25 0-.543.014-.88.044a45.83 45.83 0 00-1.012.132c-.088 0-.147-.015-.176-.044-.03-.03-.037-.059-.022-.088 0-.015.007-.037.022-.066zM.044 17.072c.073-.117.19-.124.352-.022 3.667 2.127 7.656 3.19 11.968 3.19 2.875 0 5.713-.535 8.514-1.606a17.473 17.473 0 00.616-.264c.22-.088.392-.044.517.132s.085.338-.12.484c-.265.19-.602.41-1.013.66-1.261.748-2.67 1.328-4.224 1.738-1.555.411-3.073.616-4.554.616-2.288 0-4.451-.4-6.49-1.199a17.88 17.88 0 01-5.478-3.377c-.088-.073-.132-.147-.132-.22 0-.044.015-.088.044-.132z" fill="#F90"/>
              </svg>
            }
            @case ('spotify') {
              <svg class="size-4 text-white" width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.781 7.32c-.406 0-.656-.101-1.008-.304-5.562-3.32-15.507-4.118-21.945-2.32-.281.077-.633.202-1.008.202C.79 4.898 0 4.094 0 3.055 0 1.992.656 1.39 1.36 1.187 4.11.383 7.187 0 10.54 0c5.702 0 11.679 1.188 16.046 3.734.61.352 1.008.836 1.008 1.766a1.81 1.81 0 01-1.813 1.82zm-2.422 5.953c-.406 0-.68-.18-.96-.328-4.883-2.89-12.165-4.054-18.641-2.297-.375.102-.578.204-.93.204-.836 0-1.515-.68-1.515-1.516s.406-1.39 1.21-1.617c2.172-.61 4.391-1.063 7.641-1.063 5.07 0 9.969 1.258 13.828 3.555.633.375.883.86.883 1.539-.008.844-.664 1.523-1.516 1.523zm-2.101 5.125c-.328 0-.531-.101-.836-.28-4.875-2.938-10.547-3.063-16.149-1.915-.304.078-.703.203-.93.203-.757 0-1.234-.601-1.234-1.234 0-.805.477-1.188 1.063-1.313 6.398-1.414 12.937-1.289 18.515 2.047.477.305.758.578.758 1.29a1.18 1.18 0 01-1.187 1.202z" fill="currentColor"/>
              </svg>
            }
            @case ('envato') {
              <svg class="size-3.5 text-white" width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.123 13.013l-5.04.54a.092.092 0 01-.065-.165l4.93-3.84c.319-.262.525-.668.438-1.106-.088-.669-.64-1.106-1.34-1.019l-5.36.785c-.093.012-.143-.107-.068-.166l5.312-4.056c1.046-.815 1.134-2.415.175-3.346-.872-.872-2.272-.844-3.144.028L.403 9.376a1.52 1.52 0 00-.378 1.31c.147.787.931 1.309 1.718 1.165l4.615-.94c.1-.022.154.112.07.168l-5.119 3.278c-.64.406-.931 1.134-.728 1.862.203.96 1.166 1.512 2.097 1.281l7.652-1.884a.091.091 0 01.094.147L9.23 17.238c-.319.406.203.96.64.64l3.931-3.23c.7-.582.235-1.719-.668-1.631l-.01-.004z" fill="currentColor"/>
              </svg>
            }
          }
        </div>
        <span class="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
          {{ transaction.name }}
        </span>
      </div>
    </td>

    <td app-table-cell class="min-w-44 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
      {{ transaction.date }}
    </td>

    <td app-table-cell class="min-w-32 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
      {{ transaction.price }}
    </td>

    <td app-table-cell class="min-w-36 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
      {{ transaction.category }}
    </td>

    <td app-table-cell class="min-w-28 px-4 py-3 text-start text-sm whitespace-nowrap">
      <span
        class="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-medium"
        [ngClass]="{
          'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500': transaction.status.toLowerCase() === 'success',
          'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-orange-400': transaction.status.toLowerCase() === 'pending',
          'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500': transaction.status.toLowerCase() === 'failed'
        }"
      >
        {{ transaction.status }}
      </span>
    </td>

    <td app-table-cell class="min-w-16 py-3 pe-5 text-end whitespace-nowrap sm:pe-6">
      <button app-button variant="unstyled"
        type="button"
        aria-label="More options"
        class="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <svg
          class="size-5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </button>
    </td>
  `,
  host: {
    class: 'h-16 border-b border-gray-100 dark:border-gray-800 transition hover:bg-gray-50/50 dark:hover:bg-white/2',
  },
})
export class TransactionRowComponent {
  @Input({ required: true }) transaction!: Transaction;

  getBrandBgClass(brand: string): string {
    switch (brand) {
      case 'paypal':
        return 'bg-[#1b4bf1] text-white';
      case 'apple':
        return 'bg-black dark:bg-white';
      case 'netflix':
        return 'bg-black text-white';
      case 'tesla':
        return 'bg-[#E82127]';
      case 'amazon':
        return 'bg-black';
      case 'spotify':
        return 'bg-[#1DB954]';
      case 'envato':
        return 'bg-[#82B541]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
