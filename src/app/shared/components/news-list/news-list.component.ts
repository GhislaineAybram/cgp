/**
 * @fileoverview Common News Component - Shared presentation logic
 * @description This component centralizes the display logic and reusable UI
 * elements for news-related content, used by both the NewsComponent and
 * NewsPreviewComponent to ensure consistency in layout, formatting, and behavior.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent {
  @Input() articles: Article[] = [];
  @Input() isLoading = true;
  @Input() buttonText = `Retour vers la page d'accueil`;
  @Input() buttonLink = '/';

  protected articlesService = inject(ArticlesService);
}
