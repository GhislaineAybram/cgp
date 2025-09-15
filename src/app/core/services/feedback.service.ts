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
import { Feedback } from '../../models/feedback';

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
}
