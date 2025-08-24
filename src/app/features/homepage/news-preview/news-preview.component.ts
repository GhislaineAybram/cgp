import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/article';
import { ArticlesService } from '../../../core/services/articles.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-preview',
  imports: [CommonModule, RouterModule],
  templateUrl: './news-preview.component.html',
  styleUrl: './news-preview.component.scss'
})
export class NewsPreviewComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private articlesService: ArticlesService,
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.articles = await this.articlesService.getFirstArticles(3);
  }

}
