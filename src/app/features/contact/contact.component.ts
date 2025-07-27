/**
 * @fileoverview Contact Component - Visitor contact form
 * @description Component managing the contact form where visitors can
 * submit their information to request a callback from the Financial Advisor
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private platformId = inject(PLATFORM_ID);
  emailValue = '';

  get receivedUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return `${window.location.origin}/received`;
    }
    return '';
  }
  
  onEmailInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.emailValue = target.value;
  }
}
