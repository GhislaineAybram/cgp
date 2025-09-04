/**
 * @fileoverview Testimonial Component - Client feedback and reviews
 * @description Component managing the display of client testimonials
 * and feedback about the Financial Advisor services provided
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Feedback } from '../../../models/feedback';
import { SupabaseService } from '../../../supabase.service';

@Component({
  selector: 'app-testimonial',
  standalone: true, // Si vous utilisez Angular 14+ avec des composants standalone
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit {
  feedbacks: Feedback[] = [];
  currentIndex = 0;
  isLoading = true;

  private readonly supabase = inject(SupabaseService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  async loadFeedbacks(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    try {
      this.isLoading = true;
      console.log('Loading feedbacks...');

      const { data, error } = await this.supabase.getFeedbacks();
      if (error) {
        console.error('Error loading feedbacks:', error);
        this.feedbacks = [];
      } else {
        this.feedbacks = data || [];
      }
    } catch (error) {
      console.error('Unexpected error loading feedbacks:', error);
      this.feedbacks = [];
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
      console.log('Final feedbacks:', this.feedbacks);
    }
  }

  get currentFeedback(): Feedback | undefined {
    return this.feedbacks[this.currentIndex];
  }

  get starsArray(): boolean[] {
    const rating = this.currentFeedback?.rating || 0;
    return Array(5)
      .fill(false)
      .map((_, index) => index < rating);
  }

  previousSlide(): void {
    if (this.feedbacks.length === 0) return;
    this.currentIndex = this.currentIndex === 0 ? this.feedbacks.length - 1 : this.currentIndex - 1;
  }

  nextSlide(): void {
    if (this.feedbacks.length === 0) return;
    this.currentIndex = this.currentIndex === this.feedbacks.length - 1 ? 0 : this.currentIndex + 1;
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.feedbacks.length) {
      this.currentIndex = index;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByFeedback(index: number, feedback: Feedback): string {
    return feedback.id;
  }
}
