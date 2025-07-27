/**
 * @fileoverview Pillars Component - Wealth management services offered
 * @description Component managing the display of professional services including
 * income generation, asset protection, retirement planning and tax optimization
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component } from '@angular/core';
import { Pillar } from '../../../models/pillar';

@Component({
  selector: 'app-pillars',
  imports: [],
  templateUrl: './pillars.component.html',
  styleUrl: './pillars.component.scss'
})
export class PillarsComponent {
  pillars: Pillar[] = [];

  ngOnInit(): void {
    this.pillars = [
      {
        id: '1',
        name: 'Compléter ses revenus',
        description: `Développez des sources de revenus complémentaires grâce à des placements adaptés à votre profil de risque. Que ce soit par l'investissement locatif, les produits financiers ou l'épargne de précaution, je vous aide à construire un patrimoine générateur de revenus réguliers et durables.`
      },
      {
        id: '2',
        name: 'Protéger ses proches',
        description: `Anticipez l'avenir et protégez votre famille grâce à des solutions de prévoyance sur mesure. Assurance-vie, contrats de prévoyance, garanties décès et invalidité : ensemble, nous mettons en place les dispositifs qui sécurisent votre patrimoine et préservent le niveau de vie de vos proches.`
      },
      {
        id: '3',
        name: 'Préparer sa retraite',
        description: `Constituez dès aujourd'hui un capital retraite qui vous garantira le maintien de votre niveau de vie. Plans d'épargne retraite, investissements programmés, stratégies de capitalisation : je vous accompagne pour bâtir une retraite sereine et anticiper la baisse de vos revenus futurs.`
      },
      {
        id: '4',
        name: 'Optimiser sa fiscalité',
        description: `Réduisez légalement votre pression fiscale en tirant parti des dispositifs existants. Défiscalisation immobilière, produits d'épargne défiscalisés, optimisation de la transmission : je vous guide pour structurer efficacement votre patrimoine et maximiser votre épargne nette.`
      },
    ]
  }
}
