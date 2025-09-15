/**
 * @fileoverview Articles Service - Article content management
 * @description Service providing data retrieval and management for article content.
 * It centralizes all API calls to Supabase, and exposes methods for components
 * to fetch, cache, and display media items in a consistent way.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { SupabaseService } from '../../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly supabase = inject(SupabaseService);

  async getAllArticles(): Promise<Article[]> {
    let result: Article[] = [];
    const { data, error } = await this.supabase.getAllArticles();
    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  async getFirstArticles(limit: number): Promise<Article[]> {
    let result: Article[] = [];
    const { data, error } = await this.supabase.getArticlesByLimit(limit);
    if (error) {
      console.error('Error fetching first articles:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  async loadArticlesCount() {
    let result = 0;
    const { data, error } = await this.supabase.getArticlesCount();
    if (error) {
      console.error('Error fetching articles count:', error);
    } else {
      result = data ?? 0;
    }
    return result;
  }
}
