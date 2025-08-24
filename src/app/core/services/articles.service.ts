import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { SupabaseService } from '../../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private supabase: SupabaseService) {}

  async getAllArticles(): Promise<Article[]> {
    const { data, error } = await this.supabase.getAllArticles();
    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
    return data as Article[];
  }

  async getFirstArticles(limit: number): Promise<Article[]> {
    const { data, error } = await this.supabase.getArticlesByLimit(limit);
    if (error) {
      console.error('Error fetching first articles:', error);
      return [];
    }
    return data as Article[];
  }
}
