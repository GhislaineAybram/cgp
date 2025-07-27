/**
 * @fileoverview Footer Component - Site footer with links and information
 * @description Component managing the footer display with contact information,
 * legal links, social media and additional navigation elements
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  about!: string;
  legal!: string;
  privacy!: string;
  contact!: string;
  copyright!: string;

  ngOnInit(): void {
    this.about = 'A propos';
    this.legal = 'Mentions légales';
    this.privacy = 'Politique de confidentialité';
    this.contact = 'Contact';
    this.copyright = '© 2025 Julien POUDRAS - Tous droits réservés';
  }
}
