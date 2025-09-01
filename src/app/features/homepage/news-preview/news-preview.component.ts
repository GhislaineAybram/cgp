import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/article';
import { ArticlesService } from '../../../core/services/articles.service';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from '../../../shared/components/news-list/news-list.component';

@Component({
  selector: 'app-news-preview',
  imports: [CommonModule, RouterModule, NewsListComponent],
  templateUrl: './news-preview.component.html',
  styleUrl: './news-preview.component.scss'
})
export class NewsPreviewComponent implements OnInit {

  articles: Article[] = [];
  isLoading: boolean = true;

  constructor(
    public articlesService: ArticlesService,
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.articles = await this.articlesService.getFirstArticles(3);
    this.isLoading = false;
  }

}
