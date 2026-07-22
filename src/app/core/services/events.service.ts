/**
 * @fileoverview Events Service - Events content management
 * @description Service providing data retrieval and management for event content.
 * It centralizes all API calls to Supabase, and exposes methods for components
 * to fetch, cache, and display media items in a consistent way.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Evening, EveningNew } from '../../models/evening';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly supabase = inject(SupabaseService);

  async loadEveningsCount(): Promise<number> {
    if (!this.supabase.isAvailable) {
      return 0;
    }
    const { count, error } = await this.supabase.client.from('evening').select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching evenings count:', error);
      throw error;
    }

    return count ?? 0;
  }

  async getAllFutureEvenings(): Promise<Evening[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await this.supabase.client.from('evening').select('*').gte('date', today).order('date', { ascending: true });

    if (error) {
      console.error('Error fetching future evenings:', error);
      throw error;
    }

    return data ?? [];
  }

  async getAllEvenings(): Promise<Evening[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }
    const { data, error } = await this.supabase.client.from('evening').select('*').order('date', { ascending: false });

    if (error) {
      console.error('Error fetching all evenings:', error);
      throw error;
    }

    return data ?? [];
  }

  async updateEvening(id: string, updates: Partial<Evening>) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('evening').update(updates).eq('id', id).select().single();

    if (error) {
      console.error('Error updating evening:', error);
      throw error;
    }

    return data;
  }

  async uploadEveningPicture(file: File): Promise<string> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const filename = `${Date.now()}-${file.name}`;

    const { error } = await this.supabase.client.storage.from('evenings pictures').upload(filename, file);

    if (error) {
      console.error('Error uploading evening picture:', error);
      throw error;
    }

    const { data } = this.supabase.client.storage.from('evenings pictures').getPublicUrl(filename);

    return data.publicUrl;
  }

  async createEvening(evening: EveningNew) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('evening').insert(evening).select().single();

    if (error) {
      console.error('Error creating evening:', error);
      throw error;
    }

    return data;
  }

  async deleteEvening(id: string): Promise<void> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { error } = await this.supabase.client.from('evening').delete().eq('id', id);

    if (error) {
      console.error('Error deleting evening:', error);
      throw error;
    }
  }
}
