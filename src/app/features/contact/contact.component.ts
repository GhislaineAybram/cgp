/**
 * @fileoverview Contact Component - Visitor contact form
 * @description Component managing the contact form where visitors can
 * submit their information to request a callback from the Financial Advisor
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import ownerData from '../../../assets/owner-data.json';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  ownerData = ownerData;

  ngOnInit() {
    this.title.setTitle('Formulaire de contact - Conseiller en Gestion de Patrimoine');

    this.meta.updateTag({
      name: 'description',
      content:
        'Contactez votre Conseiller en Gestion de Patrimoine pour un rendez-vous personnalisé. Obtenez des conseils experts en investissement et optimisation patrimoniale.',
    });
  }

  private platformId = inject(PLATFORM_ID);
  emailValue = '';

  get receivedUrl(): string {
    let result = '';
    if (isPlatformBrowser(this.platformId)) {
      result = `${window.location.origin}/received`;
    }
    return result;
  }

  onEmailInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.emailValue = target.value;
  }
}
