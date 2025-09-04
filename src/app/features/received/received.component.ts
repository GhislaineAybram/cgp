/**
 * @fileoverview Received Component - Contact form confirmation page
 * @description Component displaying the thank you message after successful
 * contact form submission with next steps and Financial Advisor response timeline
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-received',
  imports: [],
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
})
export class ReceivedComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Formulaire envoyé - Conseiller en Gestion de Patrimoine');

    this.meta.updateTag({
      name: 'description',
      content: 'Votre demande de contact a été transmise avec succès. Je vous recontacterai rapidement pour discuter de vos projets patrimoniaux.',
    });
  }
}
