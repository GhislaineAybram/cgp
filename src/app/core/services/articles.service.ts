/**
 * @fileoverview Articles Service - Article content management
 * @description Service providing data retrieval and management for article content.
 * It centralizes all API calls to Supabase, and exposes methods for components
 * to fetch, cache, and display media items in a consistent way.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { Article, ArticleNew } from '../../models/article';
import { SupabaseService } from '../../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly supabase = inject(SupabaseService);

  async getAllArticles(): Promise<Article[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }

    const { data, error } = await this.supabase.client.from('article').select('*').order('date', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    return data ?? [];
  }

  async getFirstArticles(limit: number): Promise<Article[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }
    const { data, error } = await this.supabase.client.from('article').select('*').order('date', { ascending: false }).limit(limit);

    if (error) {
      console.error('Error fetching first articles:', error);
      throw error;
    }

    return data ?? [];
  }

  async loadArticlesCount(): Promise<number> {
    if (!this.supabase.isAvailable) {
      return 0;
    }
    const { count, error } = await this.supabase.client.from('article').select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching articles count:', error);
      throw error;
    }

    return count ?? 0;
  }

  async updateArticle(id: string, updates: Partial<Article>) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('article').update(updates).eq('id', id).select().single();

    if (error) {
      console.error('Error updating article:', error);
      throw error;
    }

    return data;
  }

  async createArticle(article: ArticleNew) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('article').insert(article).select().single();

    if (error) {
      console.error('Error creating article:', error);
      throw error;
    }

    return data;
  }

  async deleteArticle(id: string): Promise<void> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { error } = await this.supabase.client.from('article').delete().eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }
}
