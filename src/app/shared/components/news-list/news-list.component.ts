import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  @Input() articles: Article[] = [];
  @Input() isLoading: boolean = true;
  @Input() buttonText: string = `Retour vers la page d'accueil`;
  @Input() buttonLink: string = '/';

  constructor(public articlesService: ArticlesService) {}

}
