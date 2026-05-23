import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { routes } from './app.routes';
import { TranslateService } from '@ngx-translate/core';
import { provideZonelessChangeDetection, APP_INITIALIZER } from '@angular/core';


// Master dictionary for the entire app
// Master dictionary for the entire app
const GLOBAL_TEXT: any = {
  en: {
    SIDEBAR: { 
      MENU_LABEL: "Menu",          // Added for sidebar section header
      OTHERS_LABEL: "Others",      // Added for sidebar section header
      DASHBOARD: "Dashboard",
      ECOMMERCE: "Ecommerce",
      CALENDAR: "Calendar", 
      PROFILE: "User Profile",
      FORMS: "Forms",
      FORM_ELEMENTS: "Form Elements",
      TABLES: "Tables",
      BASIC_TABLES: "Basic Tables",
      PAGES: "Pages",
      BLANK_PAGE: "Blank Page",
      ERROR_404: "404 Error",
      CHARTS: "Charts",
      LINE_CHART: "Line Chart",
      BAR_CHART: "Bar Chart",
      UI_ELEMENTS: "UI Elements",
      ALERTS: "Alerts",
      AVATAR: "Avatar",
      BADGE: "Badge",
      BUTTONS: "Buttons",
      IMAGES: "Images",
      VIDEOS: "Videos",
      AUTHENTICATION: "Authentication",
      SIGN_IN: "Sign In",
      SIGN_UP: "Sign Up"
    },
    HEADER: { SEARCH: "Search or type command..." },
    CARDS: { 
      CUSTOMERS: "Customers", 
      ORDERS: "Orders", 
      MONTHLY_TARGET: "Monthly Target" 
    },
    COMMON: {
      NEW: "New"                   // Added for "new" badges in menu
    }
  },
  zh: {
    SIDEBAR: { 
      MENU_LABEL: "菜单",           // Added for sidebar section header
      OTHERS_LABEL: "其他",         // Added for sidebar section header
      DASHBOARD: "仪表板",
      ECOMMERCE: "电子商务",
      CALENDAR: "日历", 
      PROFILE: "个人资料",
      FORMS: "表单",
      FORM_ELEMENTS: "表单元素",
      TABLES: "表格",
      BASIC_TABLES: "基础表格",
      PAGES: "页面",
      BLANK_PAGE: "空白页面",
      ERROR_404: "404 错误",
      CHARTS: "图表",
      LINE_CHART: "折线图",
      BAR_CHART: "柱状图",
      UI_ELEMENTS: "UI 元素",
      ALERTS: "警告",
      AVATAR: "头像",
      BADGE: "徽章",
      BUTTONS: "按钮",
      IMAGES: "图片",
      VIDEOS: "视频",
      AUTHENTICATION: "身份验证",
      SIGN_IN: "登录",
      SIGN_UP: "注册"
    },
    HEADER: { SEARCH: "搜索或输入命令..." },
    CARDS: { 
      CUSTOMERS: "客户", 
      ORDERS: "订单", 
      MONTHLY_TARGET: "每月目标" 
    },
    COMMON: {
      NEW: "新"                    // Added for "new" badges in menu
    }
  }
};
// This loader replaces TranslateHttpLoader and fixes the "got 3 arguments" error
export class InlineLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(GLOBAL_TEXT[lang] || GLOBAL_TEXT['en']);
  }
}

export function initializeTranslation(translate: TranslateService): () => Promise<any> {
  return () => {
    // 1. Set the default fallback
    translate.setDefaultLang('en');
    
    // 2. Determine which language to use (stored vs default)
    const savedLang = localStorage.getItem('language') || 'en';
    
    // 3. Return as a promise to block the app's initial render
    return translate.use(savedLang).toPromise();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Switch to Zoneless (Matching your Angular 21 architecture)
    provideZonelessChangeDetection(), 
    
    provideRouter(routes),
    
    // 2. Translation Module Setup
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: { 
          provide: TranslateLoader, 
          useClass: InlineLoader 
        },
        defaultLanguage: 'en',
      })
    ),

    // 3. The "Force Load" Initializer
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => {
        return () => {
          // Check localStorage for a saved preference, otherwise default to 'en'
          const lang = localStorage.getItem('selectedLanguage') || 'en';
          translate.setDefaultLang('en');
          return translate.use(lang);
        };
      },
      deps: [TranslateService],
      multi: true,
    },
  ]
};