import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  isDarkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const savedTheme = window.localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    this.setDarkMode(isDark);
  }

  toggleTheme() {
    this.setDarkMode(!this.darkModeSubject.value);
  }

  private setDarkMode(isDark: boolean) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.darkModeSubject.next(isDark);

    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
