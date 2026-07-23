/**
 * @fileoverview Admin Component - Content management dashboard
 * @description Component managing the admin panel for the advisor to autonomously
 * add/edit articles, video links and client testimonials after authentication
 *
 * @auth required
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, effect, inject, signal } from '@angular/core';
import { MediasService } from '../../core/services/medias.service';
import { ArticlesService } from '../../core/services/articles.service';
import { EventsService } from '../../core/services/events.service';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import { FeedbackService } from '../../core/services/feedback.service';
import { ContactsService } from '../../core/services/contacts.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminPannelComponent],
  templateUrl: './admin.component.html',
  styleUrls: [],
})
export class AdminComponent {
  articlesCount = signal<number>(0);
  videosCount = signal<number>(0);
  eventsCount = signal<number>(0);
  feedbackCount = signal<number>(0);
  contactsMessagesCount = signal<number>(0);
  contactsMessagesPendingCount = signal<number>(0);

  protected mediasService = inject(MediasService);
  protected articlesService = inject(ArticlesService);
  protected eventsService = inject(EventsService);
  protected feedbackService = inject(FeedbackService);
  protected contactsService = inject(ContactsService);

  dataEffect = effect(async () => {
    const [articles, videos, events, feedback, contactsMessages, contactsMessagesPending] = await Promise.all([
      this.articlesService.loadArticlesCount(),
      this.mediasService.loadMediasCount(),
      this.eventsService.loadEveningsCount(),
      this.feedbackService.loadFeedbackCount(),
      this.contactsService.loadContactsMessagesCount(),
      this.contactsService.loadPendingContactsMessagesCount(),
    ]);

    this.articlesCount.set(articles);
    this.videosCount.set(videos);
    this.eventsCount.set(events);
    this.feedbackCount.set(feedback);
    this.contactsMessagesCount.set(contactsMessages);
    this.contactsMessagesPendingCount.set(contactsMessagesPending);
  });
}
