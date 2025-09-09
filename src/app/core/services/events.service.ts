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
    const { data, error } = await this.supabase.getEveningsCount();
    if (error) {
      console.error('Error fetching events count:', error);
      return 0;
    }
    return data as number;
  }

  async getAllFutureEvenings(): Promise<Evening[]> {
    const { data, error } = await this.supabase.getAllFutureEvenings();
    if (error) {
      console.error('Error fetching future evenings:', error);
      return [];
    }
    return data as Evening[];
  }

  async getAllEvenings(): Promise<Evening[]> {
    const { data, error } = await this.supabase.getAllEvenings();
    if (error) {
      console.error('Error fetching evenings:', error);
      return [];
    }
    return data as Evening[];
  }
}
