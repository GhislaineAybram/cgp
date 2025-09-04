/**
 * @fileoverview Events Component - Thematic events and conferences
 * @description Component managing the display of upcoming thematic evenings
 * and conferences organized by the Financial Advisor
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { Evening } from '../../../models/evening';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../supabase.service';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  evenings: Evening[] = [];
  isLoading = true;

  private readonly supabase = inject(SupabaseService);

  ngOnInit(): void {
    this.loadAllEvenings();
  }

  async loadAllEvenings(): Promise<void> {
    try {
      this.isLoading = true;
      const { data, error } = await this.supabase.getAllEvenings();
      if (error) {
        console.error('Error loading evenings:', error);
        this.evenings = [];
      } else {
        this.evenings = data as Evening[];
      }
    } catch (error) {
      console.error('Unexpected error loading evenings:', error);
      this.evenings = [];
    } finally {
      this.isLoading = false;
    }
  }

}
