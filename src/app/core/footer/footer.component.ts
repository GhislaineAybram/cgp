/**
 * @fileoverview Footer Component - Site footer with links and information
 * @description Component managing the footer display with contact information,
 * legal links, social media and additional navigation elements
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../services/theme.service'; // ✅ Import
import ownerData from '../../../assets/owner-data.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  protected themeService = inject(ThemeService); // ✅ Inject

  legal!: string;
  privacy!: string;
  contact!: string;
  copyright!: string;
  ownerData = ownerData;

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  ngOnInit(): void {
    this.legal = 'Mentions légales';
    this.privacy = 'Politique de confidentialité';
    this.contact = 'Contact';
    this.copyright = '© 2025 Julien POUDRAS - Tous droits réservés';
  }
}
