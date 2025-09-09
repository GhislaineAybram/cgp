import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent, TableColumn } from '../admin-table/admin-table.component';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-admin-feedback',
  imports: [AdminPannelComponent, AdminTableComponent],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.scss',
})
export class AdminFeedbackComponent implements OnInit {
  feedbacksCount = 0;
  feedbacksDatas: Feedback[] = [];
  feedbacksColumns: TableColumn<Feedback>[] = [
    { key: 'created_at' as keyof Feedback, label: 'Date', type: 'date' },
    { key: 'feedback' as keyof Feedback, label: 'Feedback' },
    { key: 'author' as keyof Feedback, label: 'Auteur' },
    { key: 'rating' as keyof Feedback, label: 'Note' },
  ];

  protected feedbackService = inject(FeedbackService);

  async ngOnInit() {
    this.feedbacksDatas = await this.feedbackService.getAllFeedbacks();

    this.feedbacksCount = await this.feedbackService.loadFeedbackCount();
  }
}
