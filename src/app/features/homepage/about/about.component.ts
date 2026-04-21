/**
 * @fileoverview About Component - Presentation section of the Financial Advisor
 * @description Component managing the display of personal information,
 * professional background and values of the Financial Advisor
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  protected themeService = inject(ThemeService);

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }
}
