import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Article, ArticleNew } from './models/article';
import { Feedback, FeedbackNew } from './models/feedback';
import { Video, VideoNew } from './models/video';
import { Evening, EveningNew } from './models/evening';

interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  }

  getSupabaseClient(): SupabaseClient | null {
    return this.supabase;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getClient(): SupabaseClient {
    if (!this.supabase) {
      this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
      );
    }
    return this.supabase;
  }

  async getFeedbacks(): Promise<SupabaseResponse<Feedback[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const { data, error } = await this.getClient().from('testimonial').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Error in getFeedbacks:', error);
      return { data: [], error: error as Error };
    }
  }

  async getFeedbackCount(): Promise<SupabaseResponse<number>> {
    if (!this.isBrowser()) {
      return { data: 0, error: null };
    }
    try {
      const { count, error } = await this.getClient().from('testimonial').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getFeedbackCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async updateFeedback(id: string, updates: Partial<Feedback>): Promise<SupabaseResponse<Feedback>> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('testimonial').update(updates).eq('id', id).select().single();

      return { data, error };
    } catch (error) {
      console.error('Erreur dans updateFeedback:', error);
      return { data: null, error: error as Error };
    }
  }

  async newFeedback(newFeedback: FeedbackNew): Promise<{ data: Feedback | null; error: Error | null }> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('testimonial').insert([newFeedback]).select('*').single();

      if (error) {
        console.error('Supabase error creating feedback:', error.message);
        return { data: null, error: new Error(error.message) };
      }

      return { data: data as Feedback, error: null };
    } catch (error) {
      console.error('Unexpected error creating feedback:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }

  async deleteFeedback(id: string): Promise<{ error: Error | null }> {
    if (!this.isBrowser()) {
      return { error: null };
    }
    try {
      const { error } = await this.getClient()
        .from('testimonial')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase error deleting feedback:', error.message);
        return { error: new Error(error.message) };
      }
      
      return { error: null };
      
    } catch (error) {
      console.error('Unexpected error deleting feedback:', error);
      return { 
        error: error instanceof Error ? error : new Error('Unknown error') 
      };
    }
  }

  async getAllArticles(): Promise<SupabaseResponse<Article[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const { data, error } = await this.getClient().from('article').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllArticles:', error);
      return { data: [], error: error as Error };
    }
  }

  async getArticlesCount(): Promise<SupabaseResponse<number>> {
    if (!this.isBrowser()) {
      return { data: 0, error: null };
    }
    try {
      const { count, error } = await this.getClient().from('article').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getArticlesCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async getArticlesByLimit(limit: number): Promise<SupabaseResponse<Article[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const { data, error } = await this.getClient().from('article').select('*').order('date', { ascending: false }).limit(limit);

      return { data, error };
    } catch (error) {
      console.error('Error in getArticlesByLimit:', error);
      return { data: [], error: error as Error };
    }
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<SupabaseResponse<Article>> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('article').update(updates).eq('id', id).select().single();

      return { data, error };
    } catch (error) {
      console.error('Erreur dans updateArticle:', error);
      return { data: null, error: error as Error };
    }
  }

  async newArticle(newArticle: ArticleNew): Promise<{ data: Article | null; error: Error | null }> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('article').insert([newArticle]).select('*').single();

      if (error) {
        console.error('Supabase error creating article:', error.message);
        return { data: null, error: new Error(error.message) };
      }

      return { data: data as Article, error: null };
    } catch (error) {
      console.error('Unexpected error creating article:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }

  async deleteArticle(id: string): Promise<{ error: Error | null }> {
    if (!this.isBrowser()) {
      return { error: null };
    }
    try {
      const { error } = await this.getClient()
        .from('article')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase error deleting article:', error.message);
        return { error: new Error(error.message) };
      }
      
      return { error: null };
      
    } catch (error) {
      console.error('Unexpected error deleting article:', error);
      return { 
        error: error instanceof Error ? error : new Error('Unknown error') 
      };
    }
  }

  async getAllVideos(): Promise<SupabaseResponse<Video[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const { data, error } = await this.getClient().from('video').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllVideos:', error);
      return { data: [], error: error as Error };
    }
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<SupabaseResponse<Video>> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('video').update(updates).eq('id', id).select().single();

      return { data, error };
    } catch (error) {
      console.error('Erreur dans updateVideo:', error);
      return { data: null, error: error as Error };
    }
  }

  async getVideosCount(): Promise<SupabaseResponse<number>> {
    if (!this.isBrowser()) {
      return { data: 0, error: null };
    }
    try {
      const { count, error } = await this.getClient().from('video').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getVideosCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async getVideosByLimit(limit: number): Promise<SupabaseResponse<Video[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const { data, error } = await this.getClient().from('video').select('*').order('date', { ascending: false }).limit(limit);

      return { data, error };
    } catch (error) {
      console.error('Error in getVideosByLimit:', error);
      return { data: [], error: error as Error };
    }
  }

  async newVideo(newVideo: VideoNew): Promise<{ data: Video | null; error: Error | null }> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('video').insert([newVideo]).select('*').single();

      if (error) {
        console.error('Supabase error creating video:', error.message);
        return { data: null, error: new Error(error.message) };
      }

      return { data: data as Video, error: null };
    } catch (error) {
      console.error('Unexpected error creating video:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }

  async deleteVideo(id: string): Promise<{ error: Error | null }> {
    if (!this.isBrowser()) {
      return { error: null };
    }
    try {
      const { error } = await this.getClient()
        .from('video')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase error deleting video:', error.message);
        return { error: new Error(error.message) };
      }
      
      return { error: null };
      
    } catch (error) {
      console.error('Unexpected error deleting video:', error);
      return { 
        error: error instanceof Error ? error : new Error('Unknown error') 
      };
    }
  }

  async getAllFutureEvenings(): Promise<SupabaseResponse<Evening[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await this.getClient().from('evening').select('*').gte('date', today).order('date', { ascending: true });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllFutureEvenings:', error);
      return { data: [], error: error as Error };
    }
  }

  async getAllEvenings(): Promise<SupabaseResponse<Evening[]>> {
    if (!this.isBrowser()) {
      return { data: [], error: null };
    }
    try {
      const { data, error } = await this.getClient().from('evening').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllEvenings:', error);
      return { data: [], error: error as Error };
    }
  }

  async getEveningsCount(): Promise<SupabaseResponse<number>> {
    if (!this.isBrowser()) {
      return { data: 0, error: null };
    }
    try {
      const { count, error } = await this.getClient().from('evening').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getEveningsCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async updateEvening(id: string, updates: Partial<Evening>): Promise<SupabaseResponse<Evening>> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('evening').update(updates).eq('id', id).select().single();

      return { data, error };
    } catch (error) {
      console.error('Erreur dans updateEvening:', error);
      return { data: null, error: error as Error };
    }
  }

  async newEvening(newEvening: EveningNew): Promise<{ data: Evening | null; error: Error | null }> {
    if (!this.isBrowser()) {
      return { data: null, error: null };
    }
    try {
      const { data, error } = await this.getClient().from('evening').insert([newEvening]).select('*').single();

      if (error) {
        console.error('Supabase error creating evening:', error.message);
        return { data: null, error: new Error(error.message) };
      }

      return { data: data as Evening, error: null };
    } catch (error) {
      console.error('Unexpected error creating evening:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  }

  async deleteEvening(id: string): Promise<{ error: Error | null }> {
    if (!this.isBrowser()) {
      return { error: null };
    }
    try {
      const { error } = await this.getClient()
        .from('evening')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase error deleting evening:', error.message);
        return { error: new Error(error.message) };
      }
      
      return { error: null };
      
    } catch (error) {
      console.error('Unexpected error deleting evening:', error);
      return { 
        error: error instanceof Error ? error : new Error('Unknown error') 
      };
    }
  }
}
