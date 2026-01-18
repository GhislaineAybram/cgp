import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Article } from './models/article';
import { Feedback } from './models/feedback';
import { Video } from './models/video';
import { Evening } from './models/evening';

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

  async getFeedbacks(): Promise<SupabaseResponse<Feedback[]>> {
    // Vérifier si nous sommes côté client et si Supabase est initialisé
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }

    // Attendre que Supabase soit initialisé si nécessaire
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase.from('testimonial').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Error in getFeedbacks:', error);
      return { data: [], error: error as Error };
    }
  }

  async getFeedbackCount(): Promise<SupabaseResponse<number>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: 0, error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { count, error } = await this.supabase.from('testimonial').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getFeedbackCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async getAllArticles(): Promise<SupabaseResponse<Article[]>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase.from('article').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllArticles:', error);
      return { data: [], error: error as Error };
    }
  }

  async getArticlesCount(): Promise<SupabaseResponse<number>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: 0, error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { count, error } = await this.supabase.from('article').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getArticlesCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async getArticlesByLimit(limit: number): Promise<SupabaseResponse<Article[]>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase.from('article').select('*').order('date', { ascending: false }).limit(limit);

      return { data, error };
    } catch (error) {
      console.error('Error in getArticlesByLimit:', error);
      return { data: [], error: error as Error };
    }
  }

  async getAllVideos(): Promise<SupabaseResponse<Video[]>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase.from('video').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllVideos:', error);
      return { data: [], error: error as Error };
    }
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<SupabaseResponse<Video>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: null, error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }
    try {
      const { data, error } = await this.supabase.from('video').update(updates).eq('id', id).select().single();

      return { data, error };
    } catch (error) {
      console.error('Erreur dans updateVideo:', error);
      return { data: null, error: error as Error };
    }
  }

  async getVideosCount(): Promise<SupabaseResponse<number>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: 0, error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { count, error } = await this.supabase.from('video').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getVideosCount:', error);
      return { data: 0, error: error as Error };
    }
  }

  async getVideosByLimit(limit: number): Promise<SupabaseResponse<Video[]>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase.from('video').select('*').order('date', { ascending: false }).limit(limit);

      return { data, error };
    } catch (error) {
      console.error('Error in getVideosByLimit:', error);
      return { data: [], error: error as Error };
    }
  }

  async getAllFutureEvenings(): Promise<SupabaseResponse<Evening[]>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await this.supabase.from('evening').select('*').gte('date', today).order('date', { ascending: true });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllFutureEvenings:', error);
      return { data: [], error: error as Error };
    }
  }

  async getAllEvenings(): Promise<SupabaseResponse<Evening[]>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase.from('evening').select('*').order('date', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Erreur in getAllEvenings:', error);
      return { data: [], error: error as Error };
    }
  }

  async getEveningsCount(): Promise<SupabaseResponse<number>> {
    if (!isPlatformBrowser(this.platformId)) {
      return { data: 0, error: null };
    }
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { count, error } = await this.supabase.from('evening').select('*', { count: 'exact', head: true });

      return { data: count || 0, error };
    } catch (error) {
      console.error('Erreur in getEveningsCount:', error);
      return { data: 0, error: error as Error };
    }
  }
}
