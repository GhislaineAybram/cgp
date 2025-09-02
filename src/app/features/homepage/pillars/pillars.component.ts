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
        description: `Développez des sources de revenus complémentaires grâce à des placements adaptés à votre profil de risque. Que ce soit par l'investissement locatif, les produits financiers ou l'épargne de précaution, je vous aide à construire un patrimoine générateur de revenus réguliers et durables.`,
        icon: 'M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
      },
      {
        id: '2',
        name: 'Protéger ses proches',
        description: `Anticipez l'avenir et protégez votre famille grâce à des solutions de prévoyance sur mesure. Assurance-vie, contrats de prévoyance, garanties décès et invalidité : ensemble, nous mettons en place les dispositifs qui sécurisent votre patrimoine et préservent le niveau de vie de vos proches.`,
        icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
      },
      {
        id: '3',
        name: 'Préparer sa retraite',
        description: `Constituez dès aujourd'hui un capital retraite qui vous garantira le maintien de votre niveau de vie. Plans d'épargne retraite, investissements programmés, stratégies de capitalisation : je vous accompagne pour bâtir une retraite sereine et anticiper la baisse de vos revenus futurs.`,
        icon: 'M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z'
      },
      {
        id: '4',
        name: 'Optimiser sa fiscalité',
        description: `Réduisez légalement votre pression fiscale en tirant parti des dispositifs existants. Défiscalisation immobilière, produits d'épargne défiscalisés, optimisation de la transmission : je vous guide pour structurer efficacement votre patrimoine et maximiser votre épargne nette.`,
        icon: 'm8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
      },
    ]
  }
}
