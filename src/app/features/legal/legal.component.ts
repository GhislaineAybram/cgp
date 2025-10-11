/**
 * @fileoverview Legal Component - Legal notices and terms of use
 * @description Component managing the display of legal information,
 * terms of service, disclaimers and regulatory compliance information
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import ownerData from '../../../assets/owner-data.json';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  private meta = inject(Meta);
  ownerData = ownerData;

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content: 'Mentions légales et informations juridiques du Conseiller en Gestion de Patrimoine Julien Poudras.',
    });
  }

  summaryItems = [
    { id: 'edition-site', title: 'Edition du site' },
    { id: 'informations-professionnelles', title: 'Informations professionnelles' },
    { id: 'hebergement-site', title: 'Hébergement du site' },
    { id: 'nous-contacter', title: 'Nous contacter' },
    { id: 'propriete-intellectuelle', title: 'Propriété intellectuelle et contrefaçons' },
    { id: 'donnees-personnelles', title: 'Données personnelles' },
    { id: 'droit-applicable', title: 'Droit applicable et attribution de juridiction' },
  ];

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
