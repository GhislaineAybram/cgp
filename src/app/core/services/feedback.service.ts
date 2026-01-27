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

  async loadFeedbackCount() {
    let result = 0;
    const { data, error } = await this.supabase.getFeedbackCount();
    if (error) {
      console.error('Error fetching feedback count:', error);
    } else {
      result = data ?? 0;
    }
    return result;
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    let result: Feedback[] = [];
    const { data, error } = await this.supabase.getFeedbacks();
    if (error) {
      console.error('Error fetching feedbacks:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  async updateFeedback(id: string, updates: Partial<Feedback>): Promise<{ data: Feedback | null; error: Error | null }> {
    const { data, error } = await this.supabase.updateFeedback(id, updates);
    if (error) {
      console.error('Error updating feedback:', error);
    }
    return { data, error };
  }

  async createFeedback(newFeedback: FeedbackNew): Promise<{ data: Feedback | null; error: Error | null }> {
    const result = await this.supabase.newFeedback(newFeedback);
    if (result.error) {
      console.error('Error creating feedback:', result.error);
    }
    return result;
  }
}
