import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { Evening } from '../../../models/evening';
import { EventsService } from '../../../core/services/events.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { ModalSuccessComponent } from '../../../shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent, ModalSuccessComponent, ModalErrorComponent],
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
  selectedEvent: Evening | null = null;
  showSuccessModal = false;
  showErrorModal = false;

  protected eventsService = inject(EventsService);

  async ngOnInit() {
    await this.loadEvenings();
  }

  async loadEvenings() {
    this.eventsTable.rows = await this.eventsService.getAllEvenings();
    this.eventsCount = await this.eventsService.loadEveningsCount();
  }

  onEdit(evening: Evening) {
    this.selectedEvent = { ...evening };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async onSave(updatedEvening: Evening) {
    if (!updatedEvening.id) {
      console.error('Impossible de sauvegarder : ID manquant');
      return;
    }

    const { error } = await this.eventsService.updateEvening(updatedEvening.id, updatedEvening);

    if (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.showErrorModal = true;
    } else {
      this.showSuccessModal = true;
      await this.loadEvenings();
    }
  }
}
