/**
 * @fileoverview Header Component - Main navigation and branding
 * @description Component managing the main navigation bar, logo display,
 * menu items and responsive mobile navigation for the website
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  presentation!: string;
  about!: string;
  support!: string;
  feedback!: string;
  contact!: string;

  ngOnInit(): void {
    this.isMenuOpen = false;
    this.logo = 'assets/logo-mini-dark-mode.png';
    this.alt = 'logo site';
    this.presentation = 'Accueil';
    this.about = 'A propos';
    this.support = 'Mes services';
    this.feedback = 'Ce que mes clients en pensent';
    this.contact = 'Contact';
  }
}
