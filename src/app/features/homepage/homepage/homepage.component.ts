/**
 * @fileoverview Homepage Component - Main landing page
 * @description Component managing the homepage layout with all main sections:
 * about, services pillars, news, partner videos, events and client testimonials
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component } from '@angular/core';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { EventsComponent } from '../events/events.component';
import { MediasComponent } from '../medias/medias.component';
import { NewsComponent } from '../news/news.component';
import { PillarsComponent } from '../pillars/pillars.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-homepage',
  imports: [AboutComponent, PillarsComponent, TestimonialComponent, EventsComponent, MediasComponent, NewsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
