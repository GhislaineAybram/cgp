import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent, TableColumn } from '../admin-table/admin-table.component';
import { Evening } from '../../../models/evening';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-admin-events',
  imports: [AdminPannelComponent, AdminTableComponent],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit {
  eventsCount = 0;
  eventsDatas: Evening[] = [];
  eventsColumns: TableColumn<Evening>[] = [
    { key: 'date' as keyof Evening, label: 'Date', type: 'text' },
    { key: 'title' as keyof Evening, label: 'Titre', type: 'text' },
    { key: 'location' as keyof Evening, label: 'Lieu', type: 'text' },
    { key: 'hour' as keyof Evening, label: 'Heure', type: 'hour' },
    { key: 'picture' as keyof Evening, label: 'Photo', type: 'image' },
  ];
  protected eventsService = inject(EventsService);

  async ngOnInit() {
    this.eventsDatas = await this.eventsService.getAllEvenings();

    this.eventsCount = await this.eventsService.loadEveningsCount();
  }
}
