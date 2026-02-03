import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { Evening, EveningNew } from '../../../models/evening';
import { EventsService } from '../../../core/services/events.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { ModalSuccessComponent } from '../../../shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';
import { ModalConfirmationComponent } from '../../../shared/components/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent, ModalSuccessComponent, ModalErrorComponent, ModalConfirmationComponent],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit {
  eventsCount = 0;
  eventsDatas: Evening[] = [];
  eventsTable: Table<Evening> = {
    columns: [
      { key: 'date' as keyof Evening, label: 'Date', type: 'date' },
      { key: 'title' as keyof Evening, label: 'Titre', type: 'text', weight: 3 },
      { key: 'location' as keyof Evening, label: 'Lieu', type: 'text' },
      { key: 'hour' as keyof Evening, label: 'Heure', type: 'hour' },
      { key: 'picture' as keyof Evening, label: 'Photo', type: 'image' },
    ],
    rows: [],
  };

  isModalOpen = false;
  selectedEvening: Evening | null = null;
  showSuccessModal = false;
  showErrorModal = false;
  showConfirmationModal = false;
  eventToDelete: Evening | null = null;
  modalMode: 'edit' | 'create' = 'edit';

  protected eventsService = inject(EventsService);

  async ngOnInit() {
    await this.loadEvenings();
  }

  async loadEvenings() {
    this.eventsTable.rows = await this.eventsService.getAllEvenings();
    this.eventsCount = await this.eventsService.loadEveningsCount();
  }

  onEdit(evening: Evening) {
    this.selectedEvening = { ...evening };
    this.modalMode = 'edit';
    this.isModalOpen = true;
  }

  onCreation() {
    this.selectedEvening = null;
    this.modalMode = 'create';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async onUpdate(updatedEvening: Evening) {
    if (!updatedEvening.id) {
      console.error('Impossible de sauvegarder : ID manquant');
      this.showErrorModal = true;
      return;
    }

    const { error } = await this.eventsService.updateEvening(updatedEvening.id, updatedEvening);

    if (error) {
      console.error('Erreur lors de la mise à jour:', error);
      this.showErrorModal = true;
    } else {
      this.showSuccessModal = true;
      await this.loadEvenings();
    }

    this.closeModal();
  }

  async onCreate(newEvening: Partial<Evening>) {
    const { error } = await this.eventsService.createEvening(newEvening as EveningNew);

    if (error) {
      console.error('Erreur lors de la création:', error);
      this.showErrorModal = true;
    } else {
      this.showSuccessModal = true;
      await this.loadEvenings();
    }

    this.closeModal();
  }

  onDelete(event: Evening) {
    this.eventToDelete = event;
    this.showConfirmationModal = true;
  }

  async confirmDelete() {
    if (!this.eventToDelete) return;

    const { error } = await this.eventsService.deleteEvening(this.eventToDelete.id);

    if (error) {
      console.error('Erreur lors de la suppression:', error);
      this.showErrorModal = true;
    } else {
      this.showSuccessModal = true;
      await this.loadEvenings();
    }

    this.eventToDelete = null;
  }
}
