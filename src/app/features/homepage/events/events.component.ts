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
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  evenings: Evening[] = [];
  isLoading = true;

  protected eventsService = inject(EventsService);

  async ngOnInit() {
    this.evenings = await this.eventsService.getAllFutureEvenings();
    this.isLoading = false;
  }
}
