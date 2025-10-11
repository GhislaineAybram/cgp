import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { Evening } from '../../../models/evening';
import { EventsService } from '../../../core/services/events.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent],
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

  protected eventsService = inject(EventsService);

  async ngOnInit() {
    this.eventsTable.rows = await this.eventsService.getAllEvenings();

    this.eventsCount = await this.eventsService.loadEveningsCount();
  }

  onEdit(item: Evening) {
    this.selectedEvent = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
