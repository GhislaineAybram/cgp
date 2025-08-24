/**
 * @fileoverview News Component - News and legal updates
 * @description Component managing the display of articles about legal changes,
 * tax updates and financial news that may impact client finances
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../core/services/articles.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class NewsComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articlesService: ArticlesService) {}

  async ngOnInit(): Promise<void> {
    this.articles = await this.articlesService.getAllArticles();
  }
}