/**
 * @fileoverview Footer Component - Site footer with links and information
 * @description Component managing the footer display with contact information,
 * legal links, social media and additional navigation elements
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import ownerData from '../../../assets/owner-data.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  legal!: string;
  privacy!: string;
  contact!: string;
  logo!: string;
  copyright!: string;
  ownerData = ownerData;

  ngOnInit(): void {
    this.legal = 'Mentions légales';
    this.privacy = 'Politique de confidentialité';
    this.contact = 'Contact';
    this.logo = 'assets/logo_vertical_dark.webp';
    this.copyright = '© 2025 Julien POUDRAS - Tous droits réservés';
  }
}
