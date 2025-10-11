/**
 * @fileoverview News Component - News and legal updates
 * @description Component managing the display of the last three articles about legal changes,
 * tax updates and financial news that may impact client finances
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../../models/article';
import { ArticlesService } from '../../../core/services/articles.service';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from '../../../shared/components/news-list/news-list.component';

@Component({
  selector: 'app-news-preview',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsListComponent],
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.scss'],
})
export class NewsPreviewComponent implements OnInit {
  articles: Article[] = [];
  isLoading = true;

  protected articlesService = inject(ArticlesService);

  async ngOnInit(): Promise<void> {
    this.articles = await this.articlesService.getFirstArticles(3);
    this.isLoading = false;
  }
}
