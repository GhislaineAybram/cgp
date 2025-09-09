import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ArticlesService } from '../../../core/services/articles.service';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent, TableColumn } from '../admin-table/admin-table.component';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-admin-articles',
  imports: [CommonModule, AdminPannelComponent, AdminTableComponent],
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss'],
})
export class AdminArticlesComponent implements OnInit {
  articlesCount = 0;
  articlesDatas: Article[] = [];
  articlesColumns: TableColumn<Article>[] = [
    { key: 'date' as keyof Article, label: 'Date' },
    { key: 'title' as keyof Article, label: 'Titre' },
    { key: 'text' as keyof Article, label: 'Texte' },
    { key: 'theme' as keyof Article, label: 'Thème' },
    { key: 'source' as keyof Article, label: 'Source' },
    { key: 'link' as keyof Article, label: 'Lien' },
  ];

  protected articlesService = inject(ArticlesService);

  async ngOnInit() {
    this.articlesDatas = await this.articlesService.getAllArticles();

    this.articlesCount = await this.articlesService.loadArticlesCount();
  }
}
