import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialiser Supabase uniquement côté client
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  }

  getSupabaseClient(): SupabaseClient | null {
    return this.supabase;
  }

  async getFeedbacks() {
    // Vérifier si nous sommes côté client et si Supabase est initialisé
    if (!isPlatformBrowser(this.platformId)) {
      return { data: [], error: null };
    }

    // Attendre que Supabase soit initialisé si nécessaire
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    try {
      const { data, error } = await this.supabase
        .from('testimonial')
        .select('*')
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      console.error('Error in getFeedbacks:', error);
      return { data: [], error };
    }
  }
}