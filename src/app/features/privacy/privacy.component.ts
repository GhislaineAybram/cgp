/**
 * @fileoverview Privacy Component - Privacy policy and data protection
 * @description Component managing the display of privacy policy,
 * GDPR compliance information and personal data processing details
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  imports: [RouterModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  summaryItems = [
    { id: 'preambule', title: 'Préambule' },
    { id: 'principes-collecte', title: 'Principes relatifs à la collecte et au traitement des données personnelles' },
    { id: 'donnees-collectees', title: 'Données à caractère personnel collectées et traitées dans le cadre de la navigation sur le site' },
    { id: 'responsable-donnees', title: 'Responsable de la collecte et du traitement des données' },
    { id: 'droits-utilisateur', title: 'Les droits de l\'utilisateur en matière de collecte et de traitement des données' },
    { id: 'modification-politique', title: 'Modification de la politique de confidentialité' }
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
