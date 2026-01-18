import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../core/services/feedback.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';

@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.scss',
})
export class AdminFeedbackComponent implements OnInit {
  feedbacksCount = 0;
  feedbacksDatas: Feedback[] = [];
  feedbacksTable: Table<Feedback> = {
    columns: [
      { key: 'date' as keyof Feedback, label: 'Date', type: 'date' },
      { key: 'feedback' as keyof Feedback, label: 'Feedback', type: 'text', weight: 4 },
      { key: 'author' as keyof Feedback, label: 'Auteur', type: 'text' },
      { key: 'rating' as keyof Feedback, label: 'Note', type: 'number' },
    ],
    rows: [],
  };

  isModalOpen = false;
  selectedFeedback: Feedback | null = null;

  protected feedbackService = inject(FeedbackService);

  async ngOnInit() {
    this.feedbacksTable.rows = await this.feedbackService.getAllFeedbacks();

    this.feedbacksCount = await this.feedbackService.loadFeedbackCount();
  }

  onEdit(item: Feedback) {
    this.selectedFeedback = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
