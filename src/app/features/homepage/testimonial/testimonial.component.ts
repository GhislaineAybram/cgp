/**
 * @fileoverview Testimonial Component - Client feedback and reviews
 * @description Component managing the display of client testimonials
 * and feedback about the Financial Advisor services provided
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../core/services/feedback.service';

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

  protected feedbackService = inject(FeedbackService);

  async ngOnInit() {
    this.feedbacks = await this.feedbackService.getAllFeedbacks();
    this.isLoading = false;
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
