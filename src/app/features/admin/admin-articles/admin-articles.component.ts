import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ArticlesService } from '../../../core/services/articles.service';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { Article } from '../../../models/article';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { Table } from '../../../models/table';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [CommonModule, AdminPannelComponent, AdminTableComponent, AdminEditionComponent],
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss'],
})
export class AdminArticlesComponent implements OnInit {
  articlesCount = 0;
  articlesDatas: Article[] = [];
  articlesTable: Table<Article> = {
    columns: [
      { key: 'date' as keyof Article, label: 'Date', type: 'date' },
      { key: 'title' as keyof Article, label: 'Titre', type: 'text', weight: 2 },
      { key: 'text' as keyof Article, label: 'Texte', type: 'text', weight: 3 },
      { key: 'theme' as keyof Article, label: 'Thème', type: 'text' },
      { key: 'source' as keyof Article, label: 'Source', type: 'text' },
      { key: 'link' as keyof Article, label: 'Lien', type: 'text' },
    ],
    rows: [],
  };

  isModalOpen = false;
  selectedArticle: Article | null = null;

  protected articlesService = inject(ArticlesService);

  async ngOnInit() {
    this.articlesTable.rows = await this.articlesService.getAllArticles();

    this.articlesCount = await this.articlesService.loadArticlesCount();
  }

  onEdit(item: Article) {
    this.selectedArticle = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
