/**
 * @fileoverview News Component - News and legal updates
 * @description Component managing the display of all articles about legal changes,
 * tax updates and financial news that may impact client finances
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../core/services/articles.service';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from '../../shared/components/news-list/news-list.component';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule, NewsListComponent],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  articles: Article[] = [];
  isLoading = true;

  protected articlesService = inject(ArticlesService);

  async ngOnInit(): Promise<void> {
    this.articles = await this.articlesService.getAllArticles();
    this.isLoading = false;
  }
}
