import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SocialLinks } from './types';

@Component({
  selector: 'app-social-links',
  imports: [CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="flex flex-col gap-2 sm:gap-3">
      <p class="text-xs font-normal text-gray-500 sm:text-sm dark:text-gray-400">
        Social links
      </p>
      <div class="flex flex-wrap items-center gap-2">
        <!-- Facebook -->
        <a
          [href]="socialLinks.facebook || '#'"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          class="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="size-5 fill-current">
            <path d="M11.667 11.25h2.083l.833-3.333h-2.916V6.25c0-.857 0-1.666 1.666-1.666h1.25v-2.8a23.397 23.397 0 00-2.38-.117c-2.263 0-3.87 1.38-3.87 3.916v2.334h-2.5v3.333h2.5v7.084h3.334V11.25z" fill="currentColor"/>
          </svg>
        </a>

        <!-- X (Twitter) -->
        <a
          [href]="socialLinks.x || '#'"
          target="_blank"
          rel="noreferrer"
          aria-label="X"
          class="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="size-5 fill-current">
            <path d="M6.749 3.104l3.424 4.529.37.49.405-.463 3.986-4.556h1.18l-4.757 5.437-.267.306.245.325 5.843 7.723H13.38l-3.805-4.974-.37-.486-.403.46-4.375 5H3.244l5.138-5.872.27-.307-.249-.325-5.572-7.287h3.918zM4.353 4.331l9.076 11.866.15.197h2.643l-.607-.802L6.641 3.726l-.15-.199H3.736l.616.804z" fill="currentColor" stroke="currentColor"/>
          </svg>
        </a>

        <!-- LinkedIn -->
        <a
          [href]="socialLinks.linkedin || '#'"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          class="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="size-5 fill-current">
            <path d="M12.969 7.523a4.14 4.14 0 012.167-.226c.726.124 1.393.454 1.878 1.018.482.56.82 1.39.82 2.577V17h-2.292v-4.975c0-.934-.28-1.673-.758-2.178a2.276 2.276 0 00-1.748-.716c-1.282.046-2.468 1.12-2.469 2.894V17H8.283V7.567h2.306l-.022.887.939.253c.276-.503.796-.923 1.463-1.184zm-7.635.044V17H3V7.567h2.334zM4.152 3a1.166 1.166 0 11-.07 2.331 1.166 1.166 0 01.07-2.33z" fill="currentColor" stroke="currentColor"/>
          </svg>
        </a>

        <!-- Instagram -->
        <a
          [href]="socialLinks.instagram || '#'"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          class="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="size-5 fill-current">
            <path d="M10.857 1.667c.938.002 1.413.007 1.824.019l.161.005.594.025c.886.041 1.491.182 2.023.388a4.06 4.06 0 011.476.961c.462.463.749.928.961 1.476.206.531.346 1.137.388 2.023.01.223.018.407.024.594l.005.161c.013.411.018.886.02 1.824v1.713a65.505 65.505 0 01-.019 1.824l-.005.162-.025.593c-.041.887-.182 1.492-.388 2.023a4.07 4.07 0 01-.961 1.476c-.463.463-.93.75-1.476.961-.532.206-1.137.346-2.023.388l-.594.025-.162.005c-.41.012-.885.018-1.823.02H9.144a65.1 65.1 0 01-1.824-.02l-.162-.005a53.705 53.705 0 01-.593-.025c-.887-.04-1.491-.182-2.023-.388a4.073 4.073 0 01-1.476-.96 4.086 4.086 0 01-.962-1.477c-.206-.531-.345-1.136-.387-2.023l-.025-.593-.005-.162c-.012-.41-.018-.886-.02-1.824V9.143c.002-.938.007-1.413.02-1.824l.005-.161c.006-.187.014-.371.025-.594.04-.887.181-1.491.387-2.023a4.066 4.066 0 01.962-1.476 4.08 4.08 0 011.476-.961c.531-.206 1.135-.346 2.023-.388.222-.01.406-.018.593-.024l.162-.005c.41-.013.886-.018 1.824-.02h1.713zM10 5.833a4.166 4.166 0 100 8.333 4.166 4.166 0 000-8.333zM10 7.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4.375-2.917a1.042 1.042 0 10.001 2.084 1.042 1.042 0 000-2.084z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </div>
  `
})
export class SocialLinksComponent {
  @Input() socialLinks: SocialLinks = { facebook: '', x: '', linkedin: '', instagram: '' };
}
