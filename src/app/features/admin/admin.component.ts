/**
 * @fileoverview Admin Component - Content management dashboard
 * @description Component managing the admin panel for the advisor to autonomously
 * add/edit articles, video links and client testimonials after authentication
 *
 * @auth required
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit, signal } from '@angular/core';
import { MediasService } from '../../core/services/medias.service';
import { ArticlesService } from '../../core/services/articles.service';
import { EventsService } from '../../core/services/events.service';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import { FeedbackService } from '../../core/services/feedback.service';

@Component({
  selector: 'app-admin',
  imports: [AdminPannelComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  articlesCount = signal<number | null>(null);
  videosCount = signal<number | null>(null);
  eventsCount = signal<number | null>(null);
  feedbackCount = signal<number | null>(null);

  protected mediasService = inject(MediasService);
  protected articlesService = inject(ArticlesService);
  protected eventsService = inject(EventsService);
  protected feedbackService = inject(FeedbackService);

  async ngOnInit() {
    this.articlesCount.set(await this.articlesService.loadArticlesCount());
    this.videosCount.set(await this.mediasService.loadMediasCount());
    this.eventsCount.set(await this.eventsService.loadEveningsCount());
    this.feedbackCount.set(await this.feedbackService.loadFeedbackCount());
  }
}
