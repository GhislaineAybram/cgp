import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../core/services/feedback.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { ModalSuccessComponent } from '../../../shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';

@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent, ModalSuccessComponent, ModalErrorComponent],
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
  showSuccessModal = false;
  showErrorModal = false;

  protected feedbackService = inject(FeedbackService);

  async ngOnInit() {
    await this.loadFeedbacks();
  }

  async loadFeedbacks() {
    this.feedbacksTable.rows = await this.feedbackService.getAllFeedbacks();
    this.feedbacksCount = await this.feedbackService.loadFeedbackCount();
  }

  onEdit(feedback: Feedback) {
    this.selectedFeedback = { ...feedback };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async onSave(updatedFeedback: Feedback) {
    if (!updatedFeedback.id) {
      console.error('Impossible de sauvegarder : ID manquant');
      return;
    }

    const { error } = await this.feedbackService.updateFeedback(updatedFeedback.id, updatedFeedback);

    if (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.showErrorModal = true;
    } else {
      this.showSuccessModal = true;
      await this.loadFeedbacks();
    }
  }
}
