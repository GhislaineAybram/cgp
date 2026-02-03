/**
 * @fileoverview Header Component - Main navigation and branding
 * @description Component managing the main navigation bar, logo display,
 * menu items and responsive mobile navigation for the website
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  protected authService = inject(AuthService);
  
  isMenuOpen!: boolean;
  logo!: string;
  alt!: string;
  homepage!: string;
  about!: string;
  pillars!: string;
  feedback!: string;
  news!: string;
  medias!: string;
  events!: string;
  contact!: string;
  
  ngOnInit(): void {
    this.isMenuOpen = false;
    this.homepage = 'Accueil';
    this.about = 'A propos';
    this.pillars = 'Mes services';
    this.news = 'Actualités';
    this.medias = 'Mes partenaires';
    this.events = 'Soirées thématiques';
    this.feedback = 'Ils me font confiance';
    this.contact = 'Contact';
  }

  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  goTo(fragment: string | null) {
    this.isMenuOpen = false;

    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('overflow-hidden');
    }

    setTimeout(() => {
      this.router.navigate(['/'], { fragment: fragment ?? undefined });
    }, 0);
  }

  logout() {
    this.authService.signOut();
  }
}
