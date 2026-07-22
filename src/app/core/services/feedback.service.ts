/**
 * @fileoverview Feedback Service - Feedback content management
 * @description Service providing data retrieval and management for feedback content.
 * It centralizes all API calls to Supabase, and exposes methods for components
 * to fetch, cache, and display media items in a consistent way.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Feedback, FeedbackNew } from '../../models/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly supabase = inject(SupabaseService);

  async loadFeedbackCount(): Promise<number> {
    if (!this.supabase.isAvailable) {
      return 0;
    }
    const { count, error } = await this.supabase.client.from('testimonial').select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching feedback count:', error);
      throw error;
    }

    return count ?? 0;
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }
    const { data, error } = await this.supabase.client.from('testimonial').select('*').order('date', { ascending: false });

    if (error) {
      console.error('Error fetching feedbacks:', error);
      throw error;
    }

    return data ?? [];
  }

  async updateFeedback(id: string, updates: Partial<Feedback>) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('testimonial').update(updates).eq('id', id).select().single();

    if (error) {
      console.error('Error updating feedback:', error);
      throw error;
    }

    return data;
  }

  async createFeedback(feedback: FeedbackNew) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('testimonial').insert(feedback).select().single();

    if (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }

    return data;
  }

  async deleteFeedback(id: string): Promise<void> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { error } = await this.supabase.client.from('testimonial').delete().eq('id', id);

    if (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  }
}
