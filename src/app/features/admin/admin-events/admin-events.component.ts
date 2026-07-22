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
  styleUrls: [],
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

  async onUpdate(data: { item: Evening; files: Map<keyof Evening, File> }) {
    try {
      let picture = data.item.picture;

      const file = data.files.get('picture');

      if (file) {
        picture = await this.eventsService.uploadEveningPicture(file);
      }

      await this.eventsService.updateEvening(data.item.id, {
        ...data.item,
        picture,
      });

      this.showSuccessModal = true;

      await this.loadEvenings();
    } catch (error) {
      console.error(error);
      this.showErrorModal = true;
    } finally {
      this.closeModal();
    }
  }

  async onCreate(data: { item: Partial<Evening>; files: Map<keyof Evening, File> }) {
    try {
      let picture = '';

      const pictureFile = data.files.get('picture');

      if (pictureFile) {
        picture = await this.eventsService.uploadEveningPicture(pictureFile);
      }

      const newEvening: EveningNew = {
        title: data.item.title ?? '',
        location: data.item.location ?? '',
        date: data.item.date ?? new Date(),
        hour: data.item.hour ?? '',
        picture,
      };

      await this.eventsService.createEvening(newEvening);

      this.showSuccessModal = true;
      await this.loadEvenings();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      this.showErrorModal = true;
    } finally {
      this.closeModal();
    }
  }

  onDelete(event: Evening) {
    this.eventToDelete = event;
    this.showConfirmationModal = true;
  }

  async confirmDelete() {
    if (!this.eventToDelete) return;

    try {
      await this.eventsService.deleteEvening(this.eventToDelete.id);

      this.showSuccessModal = true;
      await this.loadEvenings();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      this.showErrorModal = true;
    } finally {
      this.eventToDelete = null;
    }
  }
}
