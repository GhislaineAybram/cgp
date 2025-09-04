/**
 * @fileoverview Homepage Component - Main landing page
 * @description Component managing the homepage layout with all main sections:
 * about, services pillars, news, partner videos, events and client testimonials
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { EventsComponent } from '../events/events.component';
import { PillarsComponent } from '../pillars/pillars.component';
import { AboutComponent } from '../about/about.component';
import { Meta, Title } from '@angular/platform-browser';
import { NewsPreviewComponent } from '../news-preview/news-preview.component';
import { MediasPreviewComponent } from '../medias-preview/medias-preview.component';

@Component({
  selector: 'app-homepage',
  imports: [AboutComponent, PillarsComponent, TestimonialComponent, EventsComponent, MediasPreviewComponent, NewsPreviewComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Conseiller en Gestion de Patrimoine - Julien Poudras');

    this.meta.updateTag({
      name: 'description',
      content:
        'Expert en gestion de patrimoine, je vous accompagne dans vos investissements, optimisation fiscale et stratégies patrimoniales. Actualités, conseils personnalisés et suivi clientèle.',
    });
  }
}
