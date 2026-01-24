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
import { Evening } from '../../models/evening';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly supabase = inject(SupabaseService);

  async loadEveningsCount() {
    let result = 0;
    const { data, error } = await this.supabase.getEveningsCount();
    if (error) {
      console.error('Error fetching events count:', error);
    } else {
      result = data ?? 0;
    }
    return result;
  }

  async getAllFutureEvenings(): Promise<Evening[]> {
    let result: Evening[] = [];
    const { data, error } = await this.supabase.getAllFutureEvenings();
    if (error) {
      console.error('Error fetching future evenings:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  async getAllEvenings(): Promise<Evening[]> {
    let result: Evening[] = [];
    const { data, error } = await this.supabase.getAllEvenings();
    if (error) {
      console.error('Error fetching evenings:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  async updateEvening(id: string, updates: Partial<Evening>): Promise<{ data: Evening | null; error: Error | null }> {
    const { data, error } = await this.supabase.updateEvening(id, updates);
    if (error) {
      console.error('Error updating evening:', error);
    }
    return { data, error };
  }
}
