/**
 * @fileoverview Privacy Component - Privacy policy and data protection
 * @description Component managing the display of privacy policy,
 * GDPR compliance information and personal data processing details
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import ownerData from '../../../assets/owner-data.json';

@Component({
  selector: 'app-privacy',
  imports: [RouterModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  private meta = inject(Meta);
  ownerData = ownerData;

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content:
        "Ma politique de confidentialité détaille la collecte, l'utilisation et la protection de vos données personnelles conformément au RGPD.",
    });
  }

  summaryItems = [
    { id: 'preambule', title: 'Préambule' },
    { id: 'principes-collecte', title: 'Principes relatifs à la collecte et au traitement des données personnelles' },
    { id: 'donnees-collectees', title: 'Données à caractère personnel collectées et traitées dans le cadre de la navigation sur le site' },
    { id: 'responsable-donnees', title: 'Responsable de la collecte et du traitement des données' },
    { id: 'droits-utilisateur', title: "Les droits de l'utilisateur en matière de collecte et de traitement des données" },
    { id: 'modification-politique', title: 'Modification de la politique de confidentialité' },
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
