/**
 * @fileoverview Header Component - Main navigation and branding
 * @description Component managing the main navigation bar, logo display,
 * menu items and responsive mobile navigation for the website
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
    this.logo = 'assets/logo-mini-light-mode.png';
    this.alt = 'logo site';
    this.homepage = 'Accueil';
    this.about = 'A propos';
    this.pillars = 'Mes services';
    this.news = 'Actualités';
    this.medias = 'Mes partenaires';
    this.events = 'Soirées thématiques';
    this.feedback = 'Ils me font confiance';
    this.contact = 'Contact';
  }

  constructor(
    private router: Router,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  goTo(fragment: string | null) {
    this.isMenuOpen = false;

    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('overflow-hidden');
    }

    setTimeout(() => {
      this.router.navigate(['/',], { fragment: fragment ?? undefined });
    }, 0);
  }
}
