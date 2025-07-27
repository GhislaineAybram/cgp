/**
 * @fileoverview Legal Component - Legal notices and terms of use
 * @description Component managing the display of legal information,
 * terms of service, disclaimers and regulatory compliance information
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-legal',
  imports: [RouterModule],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent {

  summaryItems = [
    { id: 'edition-site', title: 'Edition du site' },
    { id: 'informations-professionnelles', title: 'Informations professionnelles' },
    { id: 'hebergement-site', title: 'Hébergement du site' },
    { id: 'nous-contacter', title: 'Nous contacter' },
    { id: 'propriete-intellectuelle', title: 'Propriété intellectuelle et contrefaçons' },
    { id: 'donnees-personnelles', title: 'Données personnelles' },
    { id: 'droit-applicable', title: 'Droit applicable et attribution de juridiction' }
  ];

  constructor() {}

  // Méthode pour faire défiler vers un élément spécifique
  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }
}